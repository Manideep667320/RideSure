const { createPolicy, getActivePolicy, getUserPolicies } = require('../services/policyService');

const createPolicyController = async (req, res, next) => {
    try {
        const { type } = req.body;
        if (!type || (type !== 'daily' && type !== 'weekly')) {
            return res.status(400).json({ success: false, error: 'Invalid policy type' });
        }

        const policy = await createPolicy(req.user.id, type);
        res.status(201).json({ success: true, data: policy });
    } catch (error) {
        next(error);
    }
};

const getPolicyStatusController = async (req, res, next) => {
    try {
        const policy = await getActivePolicy(req.user.id);
        
        if (!policy) {
            return res.status(200).json({ success: true, data: null, message: "No active policy found" });
        }

        res.status(200).json({ success: true, data: policy });
    } catch (error) {
        next(error);
    }
};

const getUserPoliciesController = async (req, res, next) => {
    try {
        const policies = await getUserPolicies(req.user.id);
        res.status(200).json({ success: true, data: policies });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPolicyController,
    getPolicyStatusController,
    getUserPoliciesController
};
