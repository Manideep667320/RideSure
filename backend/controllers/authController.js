const {
    getUserProfile,
    updateUserProfile,
    updateUserPaymentMethods
} = require('../services/authService');

const getMeController = async (req, res, next) => {
    try {
        // req.user is appended by the protect middleware after Firebase token success
        const user = await getUserProfile(req.user.id);
        
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

const updateProfileController = async (req, res, next) => {
    try {
        const user = await updateUserProfile(req.user.id, req.body);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

const updatePaymentMethodsController = async (req, res, next) => {
    try {
        const user = await updateUserPaymentMethods(
            req.user.id,
            Array.isArray(req.body.paymentMethods) ? req.body.paymentMethods : []
        );
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMeController,
    updateProfileController,
    updatePaymentMethodsController
};
