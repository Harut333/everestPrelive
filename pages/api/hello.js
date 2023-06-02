import db from './firebaseServer.js';

export default function handler(req, res) {
  // Access the Firestore instance and perform operations
  db.collection('users')
      .get()
      .then((querySnapshot) => {
        // Process query results
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        res.status(200).json(users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      });
}
