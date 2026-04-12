const validateClaimInput = (image_url, description, GPS) => {
    if (!image_url || typeof image_url !== 'string') {
        return { isValid: false, message: 'Invalid or missing image_url' };
    }
    if (!description || typeof description !== 'string') {
        return { isValid: false, message: 'Invalid or missing description' };
    }
    if (!GPS || typeof GPS.lat !== 'number' || typeof GPS.lng !== 'number') {
        return { isValid: false, message: 'Invalid or missing GPS coordinates' };
    }
    return { isValid: true };
};

module.exports = { validateClaimInput };
