import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// To protect against exposed API keys in public repositories,
// we prioritize VITE_ environment variables first, and fall back
// to the local firebase-applet-config.json file values loaded synchronously via Vite glob.
const env = (import.meta as any).env || {};

// Eagerly/synchronously load the config file using Vite's glob import.
// This prevents initializing Firebase with undefined config when accessed synchronously.
const configs = (import.meta as any).glob("../../firebase-applet-config.json", { eager: true });
const configKey = "../../firebase-applet-config.json";
const appletConfig: any = (configs[configKey] as any)?.default || configs[configKey] || {};

let dbInstance: Firestore | null = null;
let authInstance: any = null;

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

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestoreDbId = env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || appletConfig.firestoreDatabaseId;

  dbInstance = getFirestore(app, firestoreDbId);
  return dbInstance;
}

export function getAuthInstance() {
  if (authInstance) return authInstance;
  const app = getApps().length === 0 ? initializeApp({
    apiKey: env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
    projectId: env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
    appId: env.VITE_FIREBASE_APP_ID || appletConfig.appId,
  }) : getApp();
  authInstance = getAuth(app);
  return authInstance;
}

// Export a Proxy that intercepts all property/method access on db and forwards them
// to the lazily-initialized Firestore instance. This keeps exports completely synchronous.
export const db = new Proxy({} as Firestore, {
  get(target, prop) {
    const activeDb = getDb();
    const value = Reflect.get(activeDb, prop);
    if (typeof value === "function") {
      return value.bind(activeDb);
    }
    return value;
  },
  set(target, prop, value) {
    return Reflect.set(getDb(), prop, value);
  },
  has(target, prop) {
    return Reflect.has(getDb(), prop);
  },
  ownKeys(target) {
    return Reflect.ownKeys(getDb());
  },
  getOwnPropertyDescriptor(target, prop) {
    return Reflect.getOwnPropertyDescriptor(getDb(), prop);
  },
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(getDb());
  }
});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  let auth: any = null;
  try {
    auth = getAuthInstance();
  } catch (e) {
    // Ignored
  }
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}



