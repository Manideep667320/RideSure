const express = require('express');
const { initiatePaymentController, verifyPaymentController } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All payment routes are protected

router.post('/initiate', initiatePaymentController);
router.post('/verify', verifyPaymentController);

// Helper endpoint just for hackathon ease if we want to mock verify via GET
router.get('/mock-verify/:id', async (req, res, next) => {
    try {
        const { verifyPayment } = require('../services/paymentService');
        await verifyPayment(req.params.id, true);
        res.send('Payment Mock Verified Successfully! You can close this window.');
    } catch (err) {
        res.send('Error: ' + err.message);
    }
});

module.exports = router;
