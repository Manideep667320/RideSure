const Policy = require('../models/Policy');

const createPolicy = async (userId, type) => {
    // Check for existing active policy
    const existingPolicy = await Policy.findOne({ userId, status: 'active' });
    if (existingPolicy) {
        throw new Error('User already has an active policy.');
    }

    const durationDays = type === 'daily' ? 1 : 7;
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + durationDays);

    const policy = await Policy.create({
        userId,
        type,
        endTime
    });

    return policy;
};

const getActivePolicy = async (userId) => {
    const policy = await Policy.findOne({ userId, status: 'active' });
    if (policy && new Date() > policy.endTime) {
        policy.status = 'expired';
        await policy.save();
        return null;
    }
    return policy;
};

const getUserPolicies = async (userId) => {
    const policies = await Policy.find({ userId }).sort({ createdAt: -1 });
    // Auto-expire policies where endTime has passed
    for (let policy of policies) {
        if (policy.status === 'active' && new Date() > policy.endTime) {
            policy.status = 'expired';
            await policy.save();
        }
    }
    return policies;
};

module.exports = {
    createPolicy,
    getActivePolicy,
    getUserPolicies
};
