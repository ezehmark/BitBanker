// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Added auth imports
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// Your Firebase configuration (already copied from Firebase Console)
const firebaseConfig = {
apiKey: "AIzaSyClJa9jKOfp8fo1Cl1NKLMlBqCgrRyEpmc",
  authDomain: "blocavax.firebaseapp.com",
  projectId: "blocavax",
  storageBucket: "blocavax.appspot.com",
  messagingSenderId: "461681404700",
  appId: "1:461681404700:web:867a3ff6a068b5bf7028d9",
  measurementId: "G-E70XLXXF46"};

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
