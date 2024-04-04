import express from "express";
import cors from "cors";
import Feed from "../model/feed.js";
import Post from "../model/post.js";

const feedRoute = express.Router();

const app = express();
const corsOptions = {
  methods: ['GET', 'POST'],
  origin: "http://127.0.0.1:5500"
};

app.use(cors(corsOptions));
app.use('/api/feeds', feedRoute);

// Middleware for error handling
const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Fetch all the feeds
feedRoute.get('/', asyncErrorHandler(async (req, res) => {
  const feeds = await Feed.find().populate('posts');
  res.json(feeds);
}));

// Create a new feed and associated posts
feedRoute.post('/', asyncErrorHandler(async (req, res) => {
  const { feed: feedData, post: postsData } = req.body;
  const newFeed = new Feed(feedData);
  await newFeed.save();

  const posts = await Promise.all(postsData.map(async (postData) => {
    const post = new Post({ ...postData, feed: newFeed._id });
    await post.save();
    return post;
  }));

  newFeed.posts = posts.map(post => post._id);
  await newFeed.save(); // Consider optimizing this if possible
  res.status(201).json({ feed: newFeed, posts });
}));

// Error handling middleware
feedRoute.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

export default feedRoute;
