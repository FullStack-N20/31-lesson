import express from 'express';
import {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
} from '../controller/commentController.js';

const router = express.Router();

// Create a new comment
router.post('/', createComment);

// Get all comments
router.get('/', getComments);

// Get a single comment by ID
router.get('/:id', getCommentById);

// Update a comment
router.put('/:id', updateComment);

// Delete a comment
router.delete('/:id', deleteComment);

export default router;
