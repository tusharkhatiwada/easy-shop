import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let app;
let auth;
let db;

const firebaseConfig = {
  apiKey: "AIzaSyDyHCA_wMTX9D2uVAl_1ruF9NBfG5fSnWo",
  authDomain: "easy-shop-14c3d.firebaseapp.com",
  projectId: "easy-shop-14c3d",
  storageBucket: "easy-shop-14c3d.appspot.com",
  messagingSenderId: "665479039287",
  appId: "1:665479039287:web:ed2940064e96d2dafdf2b2",
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

export { auth, db, app };
