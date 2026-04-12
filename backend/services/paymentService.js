const Transaction = require('../models/Transaction');

const initiatePayment = async (userId, amount) => {
    // Mocking Razorpay/UPI intent creation
    const transaction = await Transaction.create({
        userId,
        amount,
        status: 'pending' // Initial status
    });

    return {
        transactionId: transaction._id,
        upi_intent: `upi://pay?pa=ridesure@upi&pn=RideSure&am=${amount}&tr=${transaction._id}`,
        mock_payment_url: `http://localhost:5000/payment/mock-verify/${transaction._id}`
    };
};

const verifyPayment = async (transactionId, success) => {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error('Transaction not found');

    if (transaction.status !== 'pending') {
        throw new Error('Transaction already processed');
    }

    transaction.status = success ? 'success' : 'failed';
    transaction.paymentId = `MOCK_TXN_${Math.floor(Math.random() * 1000000)}`;
    await transaction.save();

    return transaction;
};

module.exports = {
    initiatePayment,
    verifyPayment
};
