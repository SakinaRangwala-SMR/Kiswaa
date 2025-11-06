import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginkiswa.firebaseapp.com",
  projectId: "loginkiswa",
  storageBucket: "loginkiswa.firebasestorage.app",
  messagingSenderId: "696455867308",
  appId: "1:696455867308:web:cc8c7c779edbce00102809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}