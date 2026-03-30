// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_qVfJvzcNvuhZtfZjO96XWPW_EDVd7Ek",
  authDomain: "blood-donation-managemen-b2d5e.firebaseapp.com",
  projectId: "blood-donation-managemen-b2d5e",
  storageBucket: "blood-donation-managemen-b2d5e.firebasestorage.app",
  messagingSenderId: "234791292850",
  appId: "1:234791292850:web:1925d6bcafa41889305eab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);