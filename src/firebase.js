import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAPXZd3H_Ti1ZA-PphntsNqIGeLTeVaPI",
    authDomain: "everest-f86a7.firebaseapp.com",
    projectId: "everest-f86a7",
    storageBucket: "everest-f86a7.appspot.com",
    messagingSenderId: "466881771611",
    appId: "1:466881771611:web:446e4b0ce1cdbd998d677e",
    measurementId: "G-ZEPLK02CP3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
export const auth = getAuth(app);

// Initialize Firebase Firestore
export const db = getFirestore(app);

// Export the Firebase app instance
export default app;
