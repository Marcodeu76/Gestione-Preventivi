// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Importa l'autenticazione

const firebaseConfig = {
  apiKey: "AIzaSyD6YZixnwPDWQ09K-nyXVxC-He9_BulaW8",  // La tua chiave API
  authDomain: "quotaform-411e8.firebaseapp.com",
  projectId: "quotaform-411e8",
  storageBucket: "quotaform-411e8.appspot.com",
  messagingSenderId: "310160229264",
  appId: "1:310160229264:web:59aa3aa4df26e160732915"
};

// Inizializzazione di Firebase
const app = initializeApp(firebaseConfig);

// Inizializzazione di Firestore
const db = getFirestore(app);

// Inizializzazione di Firebase Auth
const auth = getAuth(app);  // Inizializza l'autenticazione

export { db, auth };  // Esporta sia Firestore che Auth
