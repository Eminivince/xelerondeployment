// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDmcF4MDogqOH8NXodu5yD_kU01Ft5y3Nk',
  authDomain: 'xeleron-456d0.firebaseapp.com',
  projectId: 'xeleron-456d0',
  storageBucket: 'xeleron-456d0.appspot.com',
  messagingSenderId: '260861227603',
  appId: '1:260861227603:web:e99c4ac622acfc94258ca6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
