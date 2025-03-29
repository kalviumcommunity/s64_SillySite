const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserSQL = require('../models/UserSQL');
require('dotenv').config();

const router = express.Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; 

// User Registration (MySQL)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserSQL.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login (MySQL) - Generates JWT Token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSQL.findOne({ where: { email } });

        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Store token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware to Verify JWT Token from Cookie
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
        const users = await UserSQL.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout Route - Clears Cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
