import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtm41mzmA8JZZZCNDwbxhoEZiA2PZwdTk",
  authDomain: "your-movie-2acba.firebaseapp.com",
  projectId: "your-movie-2acba",
  storageBucket: "your-movie-2acba.appspot.com",
  messagingSenderId: "958305882527",
  appId: "1:958305882527:web:05a143a5e189d52907adaa",
  measurementId: "G-M1PEEPGV1W",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
