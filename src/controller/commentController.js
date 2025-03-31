import pool from '../config/db.js';

// Create Comment
export const createComment = async (req, res) => {
    const { content, post_id, user_id } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING *",
            [content, post_id, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Comments
export const getComments = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM comments");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Comment by ID
export const getCommentById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Comment
export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const result = await pool.query(
            "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
            [content, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Comment
export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM comments WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
