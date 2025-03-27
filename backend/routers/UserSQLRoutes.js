const express = require('express');
const bcrypt = require('bcrypt');
const UserSQL = require('../models/UserSQL');
const router = express.Router();

// User Registration (MySQL)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserSQL.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login (MySQL)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSQL.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Users (MySQL)
router.get('/users', async (req, res) => {
    try {
        const users = await UserSQL.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User by ID (MySQL)
router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserSQL.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User by ID (MySQL)
router.put('/users/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await UserSQL.update(
            { username, email, password: hashedPassword || undefined },
            { where: { id: req.params.id } }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User by ID (MySQL)
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await UserSQL.destroy({ where: { id: req.params.id } });
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
