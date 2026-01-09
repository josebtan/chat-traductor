// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyD-Lc7CI1PND6bQHmuOYRnF67jBc_ptCpw",
  authDomain: "chat-traductor-70a8d.firebaseapp.com",
  projectId: "chat-traductor-70a8d",
  storageBucket: "chat-traductor-70a8d.firebasestorage.app",
  messagingSenderId: "52366737452",
  appId: "1:52366737452:web:0ec03affb233f9eaaf1189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();