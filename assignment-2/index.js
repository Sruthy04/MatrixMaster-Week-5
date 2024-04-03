import express from "express";
import bodyParser from "body-parser";
import dbConfig from './config/database.config.js';
import mongoose from "mongoose";
import postSchema from './model/post.js'; // Import the schema instead of the model

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(() => {
  console.log("Database Connected Successfully!!");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

const Post = mongoose.model('Post', postSchema); // Use the schema to define the model

app.get("/data", async (req, res) => {
  try {
    const posts = await Post.find({});
    const sortedData = posts.sort((a, b) => {
      const dateA = new Date(a.createdAt.split("-").reverse().join("-"));
      const dateB = new Date(b.createdAt.split("-").reverse().join("-"));
      return dateB - dateA;
    });
    res.json(sortedData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
