// schema.js
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Idea Schema
const ideaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Idea = mongoose.model('Idea', ideaSchema);

module.exports = { User, Idea };