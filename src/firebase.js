import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwD8DbcPoIbLRPpTgbfRtOHaxT8zL4__g",
  authDomain: "fifty-page.firebaseapp.com",
  projectId: "fifty-page",
  storageBucket: "fifty-page.appspot.com",
  messagingSenderId: "G-VWC5L9ZM3C",
  appId: "1:1090594085393:web:00dfb0c7d01e3cd2862fb0",
  measurementId: "1090594085393",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export { app, storage };
