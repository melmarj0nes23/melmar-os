import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// To protect against exposed API keys in public repositories,
// we prioritize VITE_ environment variables first, and fall back
// to the local firebase-applet-config.json file values.
const env = (import.meta as any).env || {};

let appletConfig: any = {};
let configLoaded = false;

async function loadConfig() {
  if (configLoaded) return;
  try {
    // Use a dynamic import with a variable and @vite-ignore so Vite/Rollup doesn't try to resolve it during build time.
    // This prevents build failures in environments like Vercel where the gitignored config file is missing.
    const configPath = "../../firebase-applet-config.json";
    const module = await import(/* @vite-ignore */ configPath);
    appletConfig = module.default || module;
  } catch (e) {
    // File not found or failed to load, which is expected in external deployments (e.g., Vercel)
  }
  configLoaded = true;
}

// Kick off config loading in the background immediately
loadConfig().catch(() => {});

let dbInstance: Firestore | null = null;

function getDb(): Firestore {
  if (dbInstance) return dbInstance;

  const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
    projectId: env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
    appId: env.VITE_FIREBASE_APP_ID || appletConfig.appId,
  };

  // Ensure we don't initialize the app with missing/empty credentials if we are still waiting on loadConfig
  // (unless we are in an external deployment where env variables are synchronous and available).
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestoreDbId = env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || appletConfig.firestoreDatabaseId;

  dbInstance = getFirestore(app, firestoreDbId);
  return dbInstance;
}

// Export a Proxy that intercepts all property/method access on db and forwards them
// to the lazily-initialized Firestore instance. This keeps exports completely synchronous.
export const db = new Proxy({} as Firestore, {
  get(target, prop, receiver) {
    const activeDb = getDb();
    const value = Reflect.get(activeDb, prop, receiver);
    if (typeof value === "function") {
      return value.bind(activeDb);
    }
    return value;
  },
  set(target, prop, value, receiver) {
    return Reflect.set(getDb(), prop, value, receiver);
  },
  has(target, prop) {
    return Reflect.has(getDb(), prop);
  },
  ownKeys(target) {
    return Reflect.ownKeys(getDb());
  },
  getOwnPropertyDescriptor(target, prop) {
    return Reflect.getOwnPropertyDescriptor(getDb(), prop);
  }
});



