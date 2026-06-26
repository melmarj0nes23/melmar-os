import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import appletConfig from "../../firebase-applet-config.json";

// To protect against exposed API keys in public repositories,
// we prioritize VITE_ environment variables first, and fall back
// to the local firebase-applet-config.json file values.
const env = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || appletConfig.appId,
};

const app = initializeApp(firebaseConfig);

const firestoreDbId = env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || appletConfig.firestoreDatabaseId;


// Specify the custom database ID as the second parameter
export const db = getFirestore(app, firestoreDbId);

