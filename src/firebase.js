// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔹 Vul hier je eigen Firebase-configuratie in 🔹
const firebaseConfig = {
  apiKey: "AIzaSyBAUAu_dg3Ao7aLtRpJegJsg9PLc6VCBEc",
  authDomain: "JOUW_PROJECT.firebaseapp.com",
  projectId: "JOUW_PROJECT_ID",
  storageBucket: "JOUW_BUCKET.appspot.com",
  messagingSenderId: "JOUW_SENDER_ID",
  appId: "JOUW_APP_ID"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
