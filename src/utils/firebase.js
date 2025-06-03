import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy2-tNf6rIlQca_gqQh-0Z2w9VV4mQ8bU",
  authDomain: "smartsteps-app.firebaseapp.com",
  projectId: "smartsteps-app",
  storageBucket: "smartsteps-app.firebasestorage.app",
  messagingSenderId: "936677640269",
  appId: "1:936677640269:web:67d7b3bc0d364c9d59f404",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
