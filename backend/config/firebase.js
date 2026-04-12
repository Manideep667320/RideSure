const admin = require('firebase-admin');

// Ensure you replace this path with your actual service account key downloaded from Firebase
const serviceAccount = require('./serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin setup is ready.");
} catch (error) {
  console.error("Firebase Admin Initialization Error", error);
}

module.exports = admin;
