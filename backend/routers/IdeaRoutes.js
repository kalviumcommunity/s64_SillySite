const express = require('express');
const router = express.Router();
const { Idea } = require('../models/schema');
const bcrypt = require('bcrypt');



// Add a Silly Idea
router.post('/ideas', async (req, res) => {
    try {
        const { title, description, category, userId } = req.body;

        //  Validation
        if (!title || typeof title !== "string" || title.trim().length < 3) {
            return res.status(400).json({ error: "Title must be at least 3 characters long and a valid string." });
        }

        if (!description || typeof description !== "string" || description.trim().length < 10) {
            return res.status(400).json({ error: "Description must be at least 10 characters long." });
        }

        if (!category || typeof category !== "string") {
            return res.status(400).json({ error: "Category is required and must be a string." });
        }

        if (!userId || typeof userId !== "string") {
            return res.status(400).json({ error: "Valid user ID is required." });
        }

        // Create and save idea if validation passes
        const idea = new Idea({ title, description, category, user: userId });
        await idea.save();

        res.status(201).json(idea);
    } catch (error) {
        console.error("Error creating idea:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



//  Delete an idea by ID
router.delete("/ideas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedIdea = await Idea.findByIdAndDelete(id);
      
      if (!deletedIdea) {
        return res.status(404).json({ message: "Idea not found" });
      }
  
      res.status(200).json({ message: "Idea deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting idea" });
    }
  });
  

// Get All Ideas
router.get('/ideas', async (req, res) => {
    try {
        const ideas = await Idea.find().populate('user', 'username');
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/ideas/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const ideas = await Idea.find({ user: userId }).sort({ createdAt: -1 }); // Get latest ideas first
      res.status(200).json(ideas);
    } catch (error) {
      res.status(500).json({ error: "Error fetching ideas" });
    }
  });
  

// Upvote an Idea
router.post('/ideas/:id/upvote', async (req, res) => {
    try {
        const idea = await Idea.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
        res.json(idea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Downvote an Idea
router.post('/ideas/:id/downvote', async (req, res) => {
    try {
        const idea = await Idea.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true });
        res.json(idea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
