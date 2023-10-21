// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ04Q3ujvskfqzKeqg14rWicewskcnjIU",
  authDomain: "backend-3a147.firebaseapp.com",
  databaseURL: "https://backend-3a147-default-rtdb.firebaseio.com",
  projectId: "backend-3a147",
  storageBucket: "backend-3a147.appspot.com",
  messagingSenderId: "631445964267",
  appId: "1:631445964267:web:2d9e6833363908e13c85ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);