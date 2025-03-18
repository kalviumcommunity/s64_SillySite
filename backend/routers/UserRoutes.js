const express = require('express');
const router = express.Router();
const { User, Idea } = require('../models/schema');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

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
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                username,
                email,
                password: hashedPassword || undefined
            },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Add a Silly Idea
router.post('/ideas', async (req, res) => {
    try {
        const { title, description, category, userId } = req.body;
        
        if (!title || !description || !category || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

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
