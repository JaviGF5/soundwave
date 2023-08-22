import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJFTPKTJWklqz8b33UuJWjJtOm7Oyg5ug",
  authDomain: "soundwave-v2.firebaseapp.com",
  projectId: "soundwave-v2",
  storageBucket: "soundwave-v2.appspot.com",
  messagingSenderId: "763600066552",
  appId: "1:763600066552:web:080d97c5b26ac7cc23680d"
};

// Iniciar Base de Datos
export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);