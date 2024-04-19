const Message = require('../model/Message');

// GET all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'firstName lastName');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('userId', 'firstName lastName');
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
    res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST a new message
exports.createMessage = async (req, res) => {
  const message = new Message({
    userId: req.body.userId,
    message: req.body.message,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
    res.status(204).json({ message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
