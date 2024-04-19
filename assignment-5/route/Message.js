const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controller/message');

// GET all messages
messageRouter.get('/', messageController.getAllMessages);

// GET a single message by ID
messageRouter.get('/:id', messageController.getMessageById);

// POST a new message
messageRouter.post('/', messageController.createMessage);

// DELETE a message
messageRouter.delete('/:id', messageController.deleteMessage);

module.exports = messageRouter;
