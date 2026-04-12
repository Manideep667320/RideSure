const User = require('../models/User');

const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found in system');
    }
    return user;
};

const updateUserProfile = async (userId, data) => {
    const user = await User.findByIdAndUpdate(userId, { name: data.name }, { new: true });
    return user;
};

module.exports = {
    getUserProfile,
    updateUserProfile
};
