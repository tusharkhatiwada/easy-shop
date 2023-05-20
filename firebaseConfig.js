import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let app;
let auth;
let db;

const firebaseConfig = {
  apiKey: "AIzaSyB6uZBZDh3JQRk8BGVzay6DCuUyscQt-7s",
  authDomain: "vape-shop-7a95f.firebaseapp.com",
  projectId: "vape-shop-7a95f",
  storageBucket: "vape-shop-7a95f.appspot.com",
  messagingSenderId: "802726480478",
  appId: "1:802726480478:web:ee09ddc87fcf9b7e4dc2cf",
};

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };
