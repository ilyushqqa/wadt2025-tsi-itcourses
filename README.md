Install dependencies – run npm install in the project root to pull in React, Vite, Vitest, etc.
Configure Firebase – fill in your own Firebase config inside src/lib/firebase.js (or import it from an .env file) so the app can connect to Firestore.
Use this template or copy the actual one from Firebase with your Firebase configuration:

_import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<PROJECT_ID>.firebasestorage.app",
  messagingSenderId: "<SENDER_ID>",
  appId: "<APP_ID>",
  measurementId: "<MEASUREMENT_ID>",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
_

Start the dev server – run npm run dev; Vite will serve the app at http://localhost:5173 by default.
Optional: run tests – use npm test to execute the Vitest suite for the calendar and signup flows.
After these steps, the app should run locally with your Firebase backend.
