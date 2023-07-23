import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let app;
let auth;
let db;

const firebaseConfig = {
  apiKey: "AIzaSyBHDfDlSbWUYj55nTjnDhs_rJ6-FUSU100",
  authDomain: "cocktail-lists.firebaseapp.com",
  projectId: "cocktail-lists",
  storageBucket: "cocktail-lists.appspot.com",
  messagingSenderId: "868460016282",
  appId: "1:868460016282:web:fe522b30cc48d8f2c32523",
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
