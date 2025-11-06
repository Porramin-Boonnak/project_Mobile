import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIAP7sLvN8wShUYgiWZSMvtAAq-uEy8M0",
  authDomain: "project-mobile-22ab5.firebaseapp.com",
  projectId: "project-mobile-22ab5",
  storageBucket: "project-mobile-22ab5.firebasestorage.app",
  messagingSenderId: "355217768191",
  appId: "1:355217768191:web:0f9eb118dc1662881a96ca",
  measurementId: "G-FQ61S8LLET"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);