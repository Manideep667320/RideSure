const { getUserProfile, updateUserProfile } = require('../services/authService');

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
        const { name } = req.body;
        const user = await updateUserProfile(req.user.id, { name });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMeController,
    updateProfileController
};
