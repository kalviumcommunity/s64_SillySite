const express = require('express');
const router = express.Router();
const { User } = require('../models/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "1h" });

        res.json({ token, userId: user._id });  // Send userId along with token
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Middleware to Protect Routes
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

// Get All Users (Protected Route)
router.get('/users', authenticateUser, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User by ID (Protected)
router.get('/users/:id', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User by ID (Protected)
router.put('/users/:id', authenticateUser, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let updateData = { username, email };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User by ID (Protected)
router.delete('/users/:id', authenticateUser, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout - Clears Cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
