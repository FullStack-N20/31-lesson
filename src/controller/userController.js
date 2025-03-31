import pool from '../config/db.js';

// Create User
export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, phone_number, address } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [first_name, last_name, email, password, phone_number, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read all Users
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single User by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, address } = req.body;

    try {
        const result = await pool.query(
            "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5 WHERE id = $6 RETURNING *",
            [first_name, last_name, email, phone_number, address, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
