// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUCulvZRXBrH2yg7LopzvRf9LNmwJWNpU",
  authDomain: "scissor-url-shortener-503b5.firebaseapp.com",
  projectId: "scissor-url-shortener-503b5",
  storageBucket: "scissor-url-shortener-503b5.appspot.com",
  messagingSenderId: "43483591441",
  appId: "1:43483591441:web:0f873341395759ac0f12b0",
  measurementId: "G-K1RD0V4WR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);