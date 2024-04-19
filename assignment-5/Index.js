const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
const databaseConfiguration = require("./config/mongo-db");

// Routes
const userRouter = require('./route/User');
const messageRouter = require('./route/message');
const commentRouter = require('./route/comment');

// Server
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});

// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
  origin: 'http://127.0.0.1:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

//Routes
app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/comments', commentRouter);

// Database
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfiguration.url).then(() => {
  console.log("Database Connected Successfully!!");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

// Server start
app.listen(3000, () => {
  console.log("Backend server is running!");
});
