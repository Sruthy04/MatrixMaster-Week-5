const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controller/Comment');

// GET all comments
commentRouter.get('/', commentController.getAllComments);

// GET a single comment by ID
commentRouter.get('/:id', commentController.getCommentById);

// POST a new comment
commentRouter.post('/', commentController.createComment);

// DELETE a comment
commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;
