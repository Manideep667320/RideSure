const express = require('express');
const { getMeController, updateProfileController } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// The frontend will now hit /auth/me with the Firebase ID Token in the Authorization headers.
// The `protect` middleware handles Firebase Verification AND syncing MongoDB.
router.get('/me', protect, getMeController);
router.put('/profile', protect, updateProfileController);

module.exports = router;
