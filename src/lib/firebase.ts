import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVi2jUH8L4mN7ENu07D_vk9LQVHr3MI4g",
  authDomain: "gen-lang-client-0408028869.firebaseapp.com",
  projectId: "gen-lang-client-0408028869",
  storageBucket: "gen-lang-client-0408028869.firebasestorage.app",
  messagingSenderId: "283812114067",
  appId: "1:283812114067:web:ee0c05160de7e5e2652766"
};

const app = initializeApp(firebaseConfig);

// Specify the custom database ID as the second parameter
export const db = getFirestore(app, "ai-studio-portfolioos-c0a79cdb-ad4c-4823-a7cf-08feb738ac1b");
