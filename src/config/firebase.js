import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB-mlXDn7tokH6krrTuda5WrUsFYcQ5fYw",
  authDomain: "market-place-b910f.firebaseapp.com",
  projectId: "market-place-b910f",
  storageBucket: "market-place-b910f.firebasestorage.app",
  messagingSenderId: "349305025619",
  appId: "1:349305025619:web:38a04ae2a187ddbd8d82a6",
  measurementId: "G-NBDWXEZNVZ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);  


export { auth, db, storage, functions}; 