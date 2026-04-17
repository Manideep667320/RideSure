const admin = require('../config/firebase');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // 1. Verify token with Firebase Admin
            // For hackathon mock-testing without a real token, handle mock tokens conditionally
            let decodedToken;
            if (token === 'MOCK_FIREBASE_TOKEN_FOR_HACKATHON') {
                decodedToken = { uid: 'mock_firebase_uid_123', phone_number: '+1234567890' };
            } else {
                decodedToken = await admin.auth().verifyIdToken(token);
            }

            // 2. Fetch User from your MongoDB database aligned to this firebaseUid
            let user = await User.findOne({ firebaseUid: decodedToken.uid });

            // 3. Auto-populate User if first time hitting an endpoint immediately after Firebase sign-in
            if (!user) {
                user = await User.create({
                    firebaseUid: decodedToken.uid,
                    phone: decodedToken.phone_number,
                    email: decodedToken.email,
                    name: decodedToken.name
                });
            } else {
                const patch = {};
                if (!user.phone && decodedToken.phone_number) {
                    patch.phone = decodedToken.phone_number;
                }
                if (!user.email && decodedToken.email) {
                    patch.email = decodedToken.email;
                }
                if (!user.name && decodedToken.name) {
                    patch.name = decodedToken.name;
                }

                if (Object.keys(patch).length) {
                    user = await User.findByIdAndUpdate(user._id, patch, { new: true });
                }
            }

            // Attach MongoDB user info to the request for subsequent controllers
            req.user = {
                id: user._id, 
                firebaseUid: user.firebaseUid
            };

            next();
        } catch (error) {
            console.error('Firebase Auth Verification Error:', error);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
