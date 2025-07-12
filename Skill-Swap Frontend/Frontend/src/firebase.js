// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMIPf3JmpVlS11TNMWRGYvYtPw96FKXLM",
  authDomain: "skill-swap-e4984.firebaseapp.com",
  projectId: "skill-swap-e4984",
  storageBucket: "skill-swap-e4984.firebasestorage.app",
  messagingSenderId: "240466711136",
  appId: "1:240466711136:web:156c9f305f3fe269102905",
  measurementId: "G-E433TZ6GN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
// const analytics = getAnalytics(app);