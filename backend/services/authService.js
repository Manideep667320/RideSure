const User = require('../models/User');

const sanitizeString = (value) => {
    if (typeof value !== 'string') {
        return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length ? trimmed : '';
};

const sanitizeProfilePayload = (data) => ({
    name: sanitizeString(data.name),
    phone: sanitizeString(data.phone),
    email: sanitizeString(data.email)?.toLowerCase(),
    dateOfBirth: sanitizeString(data.dateOfBirth),
    addressLine1: sanitizeString(data.addressLine1),
    addressLine2: sanitizeString(data.addressLine2),
    city: sanitizeString(data.city),
    state: sanitizeString(data.state),
    postalCode: sanitizeString(data.postalCode),
    emergencyContactName: sanitizeString(data.emergencyContactName),
    emergencyContactPhone: sanitizeString(data.emergencyContactPhone),
});

const normalizePaymentMethods = (paymentMethods = []) => {
    const sanitized = paymentMethods
        .map((method) => ({
            _id: method._id,
            type: sanitizeString(method.type),
            label: sanitizeString(method.label),
            holderName: sanitizeString(method.holderName),
            upiId: sanitizeString(method.upiId),
            cardLast4: sanitizeString(method.cardLast4),
            cardBrand: sanitizeString(method.cardBrand),
            expiryMonth: sanitizeString(method.expiryMonth),
            expiryYear: sanitizeString(method.expiryYear),
            isDefault: Boolean(method.isDefault),
        }))
        .filter((method) => method.type && method.label);

    const explicitDefaultIndex = sanitized.findIndex((method) => method.isDefault);
    const defaultIndex = explicitDefaultIndex >= 0 ? explicitDefaultIndex : 0;

    return sanitized.map((method, index) => ({
        ...method,
        isDefault: index === defaultIndex,
    }));
};

const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found in system');
    }
    return user;
};

const updateUserProfile = async (userId, data) => {
    const updates = sanitizeProfilePayload(data);
    const user = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true
    });
    return user;
};

const updateUserPaymentMethods = async (userId, paymentMethods) => {
    const normalizedPaymentMethods = normalizePaymentMethods(paymentMethods);
    const user = await User.findByIdAndUpdate(userId, {
        paymentMethods: normalizedPaymentMethods
    }, {
        new: true,
        runValidators: true
    });
    return user;
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPaymentMethods
};
