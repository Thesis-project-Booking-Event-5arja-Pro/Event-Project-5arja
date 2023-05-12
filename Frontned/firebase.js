
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8wmlQdUMJ15RznbiLq9bl317VwpJTrRM",
  authDomain: "arajni.firebaseapp.com",
  projectId: "arajni",
  storageBucket: "arajni.appspot.com",
  messagingSenderId: "977181989846",
  appId: "1:977181989846:web:14274b2cd0285e56422277",
  measurementId: "G-B9EG9TW901"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};