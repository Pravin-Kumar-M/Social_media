const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const db = require('./db');
const path = require('path');
const app = express();
const PORT = 5000;

// =======================
// 🌐 Middleware Setup
// =======================
app.use(cors());
app.use(express.json());
app.use(require('./post'));
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

// ✅ Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =======================
// 📦 Multer Config for File Uploads
// =======================
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });


// =======================
// 👤 AUTH ROUTES
// =======================

// 🔐 Register User
app.post('/register', async (req, res) => {
    try {
        const { user_id, name, email, password } = req.body;
        const hashed = bcrypt.hashSync(password, 10);

        await db.query(
            "INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)",
            [user_id, name, email, hashed]
        );

        res.send({ message: 'Registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).send('Registration failed: ' + err.message);
    }
});

// 🔐 Login User
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).send("Email not found");
        }

        const user = rows[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Invalid password");
        }

        res.send({
            id: user.id,
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            profile_image: user.profile_image
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Internal server error");
    }
});

// Register User

app.post('/register', async (req, res) => {
    const { user_id, name, email, password, pass_hint } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (user_id, name, email, password, pass_hint) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [user_id, name, email, hashedPassword, pass_hint], (err, result) => {
        if (err) {
            console.error("Registration error:", err);
            return res.status(500).json("Internal Server Error");
        }
        res.status(201).json({ message: "User registered successfully" });
    });
});



// =======================
// 🖼️ PROFILE IMAGE UPDATE
// =======================


app.post('/update-profile-image', upload.single('profile_image'), async (req, res) => {
    const userId = req.body.user_id;
    const imagePath = 'uploads/' + req.file.filename;

    try {
        await db.query(
            "UPDATE users SET profile_image = ? WHERE user_id = ?",
            [imagePath, userId]
        );

        res.send({ message: "Profile updated", image: imagePath });
    } catch (err) {
        console.error("Profile update error:", err.message);
        res.status(500).send("Server error");
    }
});



// =======================
// 📸 POSTS ROUTES
// =======================

// 🚀 Upload a new post (image/video)
app.post('/upload', upload.single('media'), async (req, res) => {
    try {
        const { caption, user_id } = req.body;
        const media_path = "uploads/" + req.file.filename;
        const media_type = req.file.mimetype;

        await db.query(
            "INSERT INTO posts (caption, media_path, media_type, user_id) VALUES (?, ?, ?, ?)",
            [caption, media_path, media_type, user_id]
        );

        res.send("Post uploaded");
    } catch (err) {
        console.error("Post upload error:", err.message);
        res.status(500).send(err.message || "Upload error");
    }
});

// all posts

app.get('/posts', async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT posts.*, users.name, users.profile_image 
            FROM posts 
            JOIN users ON posts.user_id = users.user_id 
            ORDER BY posts.created_at DESC
        `);
        res.json(results);
    } catch (err) {
        console.error("Fetch all posts error:", err.message);
        res.status(500).send(err.message || "Fetch error");
    }
});

// user id posts

app.get('/user-posts/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log("Hit /user-posts with user_id:", user_id);

        const [results] = await db.query(
            "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        );

        if (results.length === 0) {
            console.log("⚠️ No posts found for user:", user_id);
        } else {
            console.log(`Found ${results.length}`);
        }

        res.json(results);
    } catch (err) {
        console.error("Route crash:", err.message);
        res.status(500).send("Server error");
    }
});

// delete the post

app.delete('/delete-post/:id', (req, res) => {
    const postId = req.params.id;
    const query = "DELETE FROM posts WHERE id = ?"; // your table might differ
    db.query(query, [postId], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to delete" });
        return res.status(200).json({ message: "Deleted" });
    });
});


// =======================
// 🚀 Start Server
// =======================
app.listen(PORT, () => {
    console.log(`💻 Server running on http://localhost:${PORT}`);
});
