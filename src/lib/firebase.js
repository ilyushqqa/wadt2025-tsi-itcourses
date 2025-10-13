import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBndsrtjbJ41swh65Q6trBy0ndYqdgGltc",
  authDomain: "wadt-2025-itcourses.firebaseapp.com",
  projectId: "wadt-2025-itcourses",
  storageBucket: "wadt-2025-itcourses.firebasestorage.app",
  messagingSenderId: "261491984035",
  appId: "1:261491984035:web:80e10551dfdf9e793d6116",
  measurementId: "G-KRXFRZGGD2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

