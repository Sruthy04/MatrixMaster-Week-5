const User = require('../model/User');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// GET a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({message: 'Cannot find user'});
    }
    res.user = user;
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// POST a new user
exports.createUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// PATCH update a user
exports.updateUser = async (req, res) => {
  return updateUserById(req, res);
};

// PUT a user
exports.replaceUser = async (req, res) => {
  return updateUserById(req, res);
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,
        {new: true});
    if (user == null) {
      return res.status(404).json({message: 'Cannot find user'});
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// DELETE a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).json({message: 'Cannot find user'});
    }
    res.status(204).json({message: 'User deleted'});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }

};

// POST check user credentials
exports.checkUserCredentials = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email, password: password});
    if (user) {
      res.status(200).json({exists: true, message: 'Login successful'});
    } else {
      res.status(401).json({exists: false, message: 'Invalid credentials'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
