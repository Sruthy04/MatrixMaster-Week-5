import express from "express";
import cors from "cors";
import Post from "../model/post.js";
import {StatusCodes} from 'http-status-codes';

const postRoute = express.Router();
const app = express();
const corsOptions = {
  methods: ['PATCH', 'DELETE'],
  origin: "http://127.0.0.1:5500"
};

app.use(cors(corsOptions));
app.use('/api/posts', postRoute);

/**
 * Updates a post by its ID.
 * @param {string} id - The ID of the post to update.
 * @param {Object} updateData - The data to update the post with.
 * @returns The updated post or an error message.
 */
postRoute.patch('/:id', async (req, res) => {
  const {id} = req.params;
  const updateData = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updateData,
        {new: true});
    if (!updatedPost) {
      return res.status(StatusCodes.NOT_FOUND).send(
          {message: 'Post not found'});
    }
    res.status(StatusCodes.OK).json(updatedPost);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        {message: error.message});
  }
});

/**
 * Deletes a post by its ID.
 * @param {string} id - The ID of the post to delete.
 * @returns A success message or an error message.
 */
postRoute.delete('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(StatusCodes.NOT_FOUND).send(
          {message: 'Post not found'});
    }
    res.status(StatusCodes.OK).send({message: 'Post successfully deleted'});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        {message: error.message});
  }
});

/**
 * Fetches a post by its ID.
 * @param {string} id - The ID of the post to fetch.
 * @returns The requested post or an error message if not found.
 */
postRoute.get('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send(
          {message: 'Post not found'});
    }
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        {message: error.message});
  }
});

export default postRoute;
