import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controller/postController.js';

const router = express.Router();

// Create a new post
router.post('/', createPost);

// Get all posts
router.get('/', getPosts);

// Get a single post by ID
router.get('/:id', getPostById);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);

export default router;
