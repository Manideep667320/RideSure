const admin = require('firebase-admin');

// Load service account from environment variable or file
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // For production (Render, etc.): load from env var
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // For local development: load from file
  serviceAccount = require('./serviceAccountKey.json');
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin setup is ready.");
} catch (error) {
  console.error("Firebase Admin Initialization Error", error);
}

module.exports = admin;
