/**
 * Compute the overall risk score based on policy validity, image validity, and fraud detection flags.
 * Formula: risk_score = (policy * 0.4) + (image * 0.3) + ((1 - fraud) * 0.3)
 * @param {boolean} isPolicyValid - True if policy is valid and active.
 * @param {boolean} isImageValid - True if image is clear and relevant.
 * @param {boolean} isFraud - True if fraud is detected.
 * @returns {number} - A risk score from 0.0 to 1.0. Higher is better (less risk).
 */
const computeRiskScore = (isPolicyValid, isImageValid, isFraud) => {
    let policyScore = isPolicyValid ? 1.0 : 0.0;
    let imageScore = isImageValid ? 1.0 : 0.0;
    let fraudValue = isFraud ? 1.0 : 0.0; // 1 means fraud, 0 means no fraud
    
    // (1 - fraudValue) means if it's fraud (1), term is 0. If no fraud (0), term is 1.
    const riskScore = (policyScore * 0.4) + (imageScore * 0.3) + ((1 - fraudValue) * 0.3);
    
    return riskScore;
};

module.exports = { computeRiskScore };
