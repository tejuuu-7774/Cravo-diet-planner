import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXOcWydKBRBfDTrazs2MJI1Hxx17ufY_0",
  authDomain: "cravo-aecec.firebaseapp.com",
  projectId: "cravo-aecec",
  storageBucket: "cravo-aecec.firebasestorage.app",
  messagingSenderId: "190066865325",
  appId: "1:190066865325:web:498eb77e42a9e0751bc224"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
