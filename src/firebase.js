// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzmSgbl5gp52UcA21-zW-iIUxeAVc3QkQ",
  authDomain: "reactproject-6933f.firebaseapp.com",
  projectId: "reactproject-6933f",
  storageBucket: "reactproject-6933f.appspot.com",
  messagingSenderId: "648623041143",
  appId: "1:648623041143:web:4a610640a45f87cf257472",
  measurementId: "G-4FCTLFEWVS"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db =  getFirestore();