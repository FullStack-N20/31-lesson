import pool from '../config/db.js';

// Create Post
export const createPost = async (req, res) => {
    const { title, content, slug, user_id } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO posts (title, content, slug, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, slug, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Posts
export const getPosts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Post by ID
export const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, slug } = req.body;

    try {
        const result = await pool.query(
            "UPDATE posts SET title = $1, content = $2, slug = $3 WHERE id = $4 RETURNING *",
            [title, content, slug, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
