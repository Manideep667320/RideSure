const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy',
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    GPS: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REVIEW', 'REJECTED'],
        default: 'PENDING'
    },
    risk_score: {
        type: Number,
        default: 0
    },
    flags: {
        type: [String],
        default: []
    },
    ai_explanation: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Claim', claimSchema);
