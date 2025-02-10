const express = require("express");
const connectDB = require('./Database');
const router = express.Router();

// Create (POST)
router.post("/ideas", async (req, res) => {
    try {
        const newIdea = new Idea(req.body);
        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read (GET)
router.get("/ideas", async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update (PUT)
router.put("/ideas/:id", async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIdea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete (DELETE)
router.delete("/ideas/:id", async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Idea deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
