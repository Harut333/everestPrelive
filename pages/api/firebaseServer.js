const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

// Check if the default app is already initialized
if (!admin.apps.length) {
    // Initialize Firebase Admin SDK
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://everest-f86a7-default-rtdb.firebaseio.com/',
    });
}

// Access the Firestore instance
const db = admin.firestore();
console.log('Firestore DB:', db); // Add this line to check if the `db` object is defined and correct

// Export the Firestore instance
export default db;
