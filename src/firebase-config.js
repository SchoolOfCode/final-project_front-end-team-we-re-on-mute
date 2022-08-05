import { initializeApp } from "firebase/app"
import {getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDhJz5UPJegaXJjbsn3n7KHoZyMEVp2-1k",
  authDomain: "holiday-helper1.firebaseapp.com",
  projectId: "holiday-helper1",
  storageBucket: "holiday-helper1.appspot.com",
  messagingSenderId: "73772116500",
  appId: "1:73772116500:web:14f5a1e877a4e2349dd501",
  measurementId: "G-DCTBHJV3ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
