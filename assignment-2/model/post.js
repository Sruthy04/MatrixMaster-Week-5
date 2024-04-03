import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    minlength: 25,
  },
});

export default schema;