// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ-pnkfhHUFsyRW_DV86ftRdzyzxPpeP0",
  authDomain: "aij-landing.firebaseapp.com",
  projectId: "aij-landing",
  storageBucket: "aij-landing.firebasestorage.app",
  messagingSenderId: "213907231439",
  appId: "1:213907231439:web:28f5f29b8dfd3f0ce41dba",
  measurementId: "G-07TZJKLHX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);