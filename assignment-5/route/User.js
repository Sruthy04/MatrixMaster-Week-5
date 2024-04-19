const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/User');

// GET all users
userRouter.get('/', userController.getAllUsers);

// GET a single user by ID
userRouter.get('/:id', userController.getUserById);

// POST a new user
userRouter.post('/', userController.createUser);

// PATCH update a user
userRouter.patch('/:id', userController.updateUser);

// PUT update a user
userRouter.put('/:id', userController.replaceUser);

// DELETE a user
userRouter.delete('/:id', userController.deleteUser);

// CHECK user
userRouter.post('/check-credentials', userController.checkUserCredentials)

module.exports = userRouter;
