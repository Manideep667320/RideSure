const mongoose = require('mongoose');

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
    name: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
