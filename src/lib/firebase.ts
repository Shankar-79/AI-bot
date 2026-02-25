// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNKlxMwIdQEoTxKx7nHdX_rXrvGMC6e6s",
  authDomain: "prajkata-project.firebaseapp.com",
  projectId: "prajkata-project",
  storageBucket: "prajkata-project.firebasestorage.app",
  messagingSenderId: "26516319556",
  appId: "1:26516319556:web:a055d500e53218b03dbb11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);