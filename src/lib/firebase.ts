// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaYyeqB9Fl_3Of96pAF8DSXbHcNLczWxw",
    authDomain: "intro-to-networking.firebaseapp.com",
    projectId: "intro-to-networking",
    storageBucket: "intro-to-networking.firebasestorage.app",
    messagingSenderId: "699493889462",
    appId: "1:699493889462:web:97b350a641fad468df3d17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, storage, db, auth };
