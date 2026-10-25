
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// ✅ Import routes
const usersRouter = require('./routes/users');
const lostItemsRouter = require('./routes/lostItems');
const foundItemsRouter = require('./routes/foundItems');
const shopRoutes = require("./routes/ShopRoutes");
const messageRoutes = require('./routes/messageRoutes');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/signup')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error: ", err));

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const reportItemsRouter = require('./routes/reportItems');

app.use('/reports', reportItemsRouter);
app.use("/shopItems", shopRoutes);
app.use('/messages', messageRoutes);

// Routes
app.get('/', (req, res) => {
  res.send("✅ Backend is running...");
});
app.use('/users', usersRouter);
app.use('/lostItems', lostItemsRouter);
app.use('/foundItems', foundItemsRouter);

// View engine (optional if you only want API)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Error Handling
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server
app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});

module.exports = app;

