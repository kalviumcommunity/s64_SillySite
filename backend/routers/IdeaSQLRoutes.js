const express+++++++++++++++++++++++++- ='' require("express");
const router = express.Router();
const db = require("../config/db"); // Import MySQL connection

// Add a Silly Idea
router.post("/ideas", async (req, res) => {
    try {
        const { title, description, category, userId } = req.body;

        if (!title || title.trim().length < 3) {
            return res.status(400).json({ error: "Title must be at least 3 characters long." });
        }

        if (!description || description.trim().length < 10) {
            return res.status(400).json({ error: "Description must be at least 10 characters long." });
        }

        if (!category) {
            return res.status(400).json({ error: "Category is required." });
        }

        if (!userId) {
            return res.status(400).json({ error: "Valid user ID is required." });
        }

        const query = `INSERT INTO ideas (title, description, category, user_id) VALUES (?, ?, ?, ?)`;
        db.query(query, [title, description, category, userId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Idea created successfully", ideaId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Ideas
router.get("/ideas", async (req, res) => {
    try {
        const query = `SELECT ideas.*, users.username FROM ideas JOIN users ON ideas.user_id = users.id ORDER BY ideas.created_at DESC`;
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Ideas by User ID
router.get("/ideas/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM ideas WHERE user_id = ? ORDER BY created_at DESC`;
        db.query(query, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an Idea
router.delete("/ideas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM ideas WHERE id = ?`;
        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Idea not found" });
            res.json({ message: "Idea deleted successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upvote an Idea
router.post("/ideas/:id/upvote", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `UPDATE ideas SET upvotes = upvotes + 1 WHERE id = ?`;
        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Idea upvoted successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Downvote an Idea
router.post("/ideas/:id/downvote", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `UPDATE ideas SET downvotes = downvotes + 1 WHERE id = ?`;
        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Idea downvoted successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
