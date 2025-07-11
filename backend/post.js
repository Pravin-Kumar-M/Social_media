const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

// 🧹 DELETE POST (from DB & filesystem)
router.delete('/delete-post/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const [rows] = await db.query("SELECT media_path FROM posts WHERE id = ?", [postId]);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        const mediaPath = path.join(__dirname, 'uploads', rows[0].media_path);

        // Delete post from DB
        await db.query("DELETE FROM posts WHERE id = ?", [postId]);

        // Delete media file
        fs.unlink(mediaPath, (err) => {
            if (err) {
                console.error("File delete error:", err.message);
                return res.status(200).json({ message: "Post deleted, but file not found" });
            }
            return res.status(200).json({ message: "Post and file deleted successfully" });
        });

    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ error: "Something went wrong while deleting the post." });
    }
});

router.post('/register', async (req, res) => {
    const { user_id, name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const passHint = password.slice(0, 3).toLowerCase();

        const sql = `INSERT INTO users (user_id, name, email, password, pass_hint) VALUES (?, ?, ?, ?, ?)`;
        await db.query(sql, [user_id, name, email, hashedPassword, passHint]);

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (!rows.length) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Send hint if password is wrong
            return res.status(401).json({
                error: "Invalid password",
                hint: user.pass_hint || "No hint available"
            });
        }

        // If login is valid
        res.status(200).json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
