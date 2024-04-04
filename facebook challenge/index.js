import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import databaseConfiguration from "./config/database.js";

import feedRoute from './controller/feeds.js';
import postRoute from './controller/posts.js';


// Server
const app = express();

// Cross-origin policy
// Configure CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});


// Database
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfiguration.url).then(() => {
  console.log("Database Connected Successfully!!");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/feeds", feedRoute);
app.use("/api/posts", postRoute);


app.listen(3000, () => {
  console.log("Backend server is running!");
});
