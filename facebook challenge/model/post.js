import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    maxlength: 40
  },
  likes: Number,
  created_at: Date,
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feed"
  }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
