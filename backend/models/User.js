const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    preferences: { type: Object, default: {} },
    chatHistory: { type: Array, default: [] },
    songHistory: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userSchema);
