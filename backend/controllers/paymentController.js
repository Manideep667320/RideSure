const { initiatePayment, verifyPayment } = require('../services/paymentService');

const initiatePaymentController = async (req, res, next) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, error: 'Valid amount is required' });
        }

        const data = await initiatePayment(req.user.id, amount);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

const verifyPaymentController = async (req, res, next) => {
    try {
        const { transactionId, success } = req.body;
        if (!transactionId || typeof success !== 'boolean') {
            return res.status(400).json({ success: false, error: 'Transaction ID and success status required' });
        }

        const data = await verifyPayment(transactionId, success);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    initiatePaymentController,
    verifyPaymentController
};
