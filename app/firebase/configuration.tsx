import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-tGUwGg5YE27FxMeWbMI8gBgNQnzuC7o",
  authDomain: "gharbeti1.firebaseapp.com",
  projectId: "gharbeti1",
  storageBucket: "gharbeti1.firebasestorage.app",
  messagingSenderId: "566910475839",
  appId: "1:566910475839:web:548ea63acee8431831628a",
  measurementId: "G-YT0WPB5DVH",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth and set persistence manually
const auth = getAuth(firebaseApp);

// Initialize Firestore and Storage
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };
