// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Added auth imports
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// Your Firebase configuration (already copied from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCHKz2c_zOCdrRYzYFw0a1CwWwHVUU0lPE",
  authDomain: "bitbankerauth.firebaseapp.com",
  projectId: "bitbankerauth",
  storageBucket: "bitbankerauth.appspot.com",
  messagingSenderId: "307534060015",
  appId: "1:307534060015:web:6ff9462be34fabd592be1a",
  measurementId: "G-YT9EJEXV2L",
};

// Initialize Firebase and Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
//
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, googleProvider, db, analytics,storage };
