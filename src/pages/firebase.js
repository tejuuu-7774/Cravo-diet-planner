import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  
  authDomain: "cravo.firebaseapp.com",
  projectId: "cravo",
  storageBucket: "cravo.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
