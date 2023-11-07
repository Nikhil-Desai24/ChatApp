// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; // getauth function added, this is for email and password generation
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDR4khA-rv8YpWWN2hK4pLhqHmddaP5ELA",
  authDomain: "chats-890b2.firebaseapp.com",
  projectId: "chats-890b2",
  storageBucket: "chats-890b2.appspot.com",
  messagingSenderId: "810817315041",
  appId: "1:810817315041:web:3e6f23c70aa428c19a57a0"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();