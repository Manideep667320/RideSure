const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load service account from environment variable or file
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    // For production (Render, etc.): load from env var
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", error);
    process.exit(1);
  }
} else {
  // For local development: load from file
  const keyPath = path.join(__dirname, './serviceAccountKey.json');
  if (fs.existsSync(keyPath)) {
    serviceAccount = require('./serviceAccountKey.json');
  } else {
    console.error("❌ ERROR: serviceAccountKey.json not found and FIREBASE_SERVICE_ACCOUNT env var not set!");
    console.error("Set FIREBASE_SERVICE_ACCOUNT environment variable in Render with your Firebase service account JSON.");
    process.exit(1);
  }
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("✅ Firebase Admin setup is ready.");
} catch (error) {
  console.error("❌ Firebase Admin Initialization Error", error);
  process.exit(1);
}

module.exports = admin;
