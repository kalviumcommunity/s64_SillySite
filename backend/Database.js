require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./Database");
const app = express();
const MONGO_URI = process.env.MONGO_URI; // Ensure your .env file contains MONGO_URI
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("Connected to MongoDB successfully"));

app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.json({ databaseStatus: dbStatus });
});
