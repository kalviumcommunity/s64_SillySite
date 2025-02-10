require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./Database'); // Import MongoDB connection

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Allows handling JSON data

// Home Route - Shows Database Connection Status
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.json({ message: "Welcome to SillySite!", databaseStatus: dbStatus });
});

// Test Route
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
