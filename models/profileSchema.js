const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    serverID: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 1000
    },
    bank: {
        type: Number
    }
});

const model = mongoose.model('profileModels', profileSchema);

module.exports = model;
