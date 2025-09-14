import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAsHudQAe7tiAUkg76TVPgg5SntEZsVhc",
  authDomain: "todo-list-b9f4b.firebaseapp.com",
  projectId: "todo-list-b9f4b",
  storageBucket: "todo-list-b9f4b.firebasestorage.app",
  messagingSenderId: "320432633093",
  appId: "1:320432633093:web:43728b2e5360f201a6736c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

export { auth, database };
