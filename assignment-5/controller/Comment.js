const Comment = require('../model/Comment');

// GET all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('userId', 'firstName lastName').populate('messageId', 'message');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('userId', 'firstName lastName').populate('messageId', 'message');
    if (comment == null) {
      return res.status(404).json({ message: 'Cannot find comment' });
    }
    res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST a new comment
exports.createComment = async (req, res) => {
  const comment = new Comment({
    messageId: req.body.messageId,
    userId: req.body.userId,
    comment: req.body.comment,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: 'Cannot find comment' });
    }
    res.status(204).json({ message: 'Comment deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
