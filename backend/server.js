const express = require("express");
const connectDB = require("./MongoDB");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const Mongo_URL = process.env.MONGO_URL; // Ensure your .env file contains MONGO_URI

mongoose.connect(Mongo_URL);

const db = mongoose.connection;

db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("Connected to MongoDB successfully"));

app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.json({ databaseStatus: dbStatus });
});