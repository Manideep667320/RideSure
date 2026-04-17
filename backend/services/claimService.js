const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const { evaluateClaim } = require('./aiAgentService');

const submitClaim = async (userId, claimData) => {
    // 1. Fetch user's active policy
    const policy = await Policy.findOne({ userId, status: 'active' });

    // 2. Initialize Claim in DB
    const newClaim = await Claim.create({
        userId,
        policyId: policy ? policy._id : null,
        image_url: claimData.image_url,
        description: claimData.description,
        GPS: claimData.GPS
    });

    // 3. Trigger AI Workflow
    const aiResult = await evaluateClaim(policy, claimData, userId);

    // 4. Update Claim with AI decision
    newClaim.status = aiResult.decision;
    newClaim.risk_score = aiResult.risk_score;
    newClaim.flags = aiResult.flags;
    newClaim.ai_explanation = aiResult.ai_explanation;

    await newClaim.save();

    return newClaim;
};

const getClaimDetails = async (claimId, userId) => {
    const claim = await Claim.findOne({ _id: claimId, userId }).populate('policyId');
    if (!claim) {
        throw new Error('Claim not found');
    }
    return claim;
};

const getUserClaims = async (userId) => {
    const claims = await Claim.find({ userId }).populate('policyId').sort({ createdAt: -1 });
    return claims;
};

module.exports = {
    submitClaim,
    getClaimDetails,
    getUserClaims
};
