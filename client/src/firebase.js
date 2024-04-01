// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app2-ccb07.firebaseapp.com",
  projectId: "blog-app2-ccb07",
  storageBucket: "blog-app2-ccb07.appspot.com",
  messagingSenderId: "1070336696239",
  appId: "1:1070336696239:web:652503307c17a7547d195a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
