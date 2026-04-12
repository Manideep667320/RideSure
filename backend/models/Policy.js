const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['daily', 'weekly'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Policy', policySchema);
