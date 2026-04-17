const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['upi', 'card'],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    holderName: {
        type: String,
        required: false
    },
    upiId: {
        type: String,
        required: false
    },
    cardLast4: {
        type: String,
        required: false
    },
    cardBrand: {
        type: String,
        required: false
    },
    expiryMonth: {
        type: String,
        required: false
    },
    expiryYear: {
        type: String,
        required: false
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    _id: true
});

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: String,
        required: false
    },
    addressLine1: {
        type: String,
        required: false
    },
    addressLine2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: false
    },
    emergencyContactName: {
        type: String,
        required: false
    },
    emergencyContactPhone: {
        type: String,
        required: false
    },
    paymentMethods: {
        type: [paymentMethodSchema],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
