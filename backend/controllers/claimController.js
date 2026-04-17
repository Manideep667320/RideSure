const { submitClaim, getClaimDetails, getUserClaims } = require('../services/claimService');
const { validateClaimInput } = require('../utils/validators');

const submitClaimController = async (req, res, next) => {
    try {
        const { image_url, description, GPS } = req.body;
        
        const validation = validateClaimInput(image_url, description, GPS);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, error: validation.message });
        }

        const claim = await submitClaim(req.user.id, { image_url, description, GPS });
        res.status(201).json({ success: true, data: claim });
    } catch (error) {
        next(error);
    }
};

const getClaimController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const claim = await getClaimDetails(id, req.user.id);
        res.status(200).json({ success: true, data: claim });
    } catch (error) {
        next(error);
    }
};

const getUserClaimsController = async (req, res, next) => {
    try {
        const claims = await getUserClaims(req.user.id);
        res.status(200).json({ success: true, data: claims });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitClaimController,
    getClaimController,
    getUserClaimsController
};
