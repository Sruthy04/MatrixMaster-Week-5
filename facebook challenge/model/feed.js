import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15
  },
  created_at: Date,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});
const Feed  = mongoose.model('Feed', feedSchema);
export default Feed;
