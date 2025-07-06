// firebase.js
// — keep all your Firebase config & exports in one place

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDqL04gma1_eybExI3RVz_eY3K5Yt1gfxU",
  authDomain: "hehaven-78909.firebaseapp.com",
  projectId: "hehaven-78909",
  storageBucket: "hehaven-78909.firebasestorage.app",
  messagingSenderId: "53938473551",
  appId: "1:53938473551:web:9583caec2f87f0c90f383a",
  measurementId: "G-XNYZ19ZRYZ"
};

// initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export what you need in other modules:
export { db, collection, addDoc, serverTimestamp };
