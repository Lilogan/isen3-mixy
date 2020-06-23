const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

// Define environnement variables
dotenv.config();

// Initiate Mongo Server
const InitiateMongoServer = require('./config/db');
InitiateMongoServer();

// Schedule jobs
const startJobs = require('./config/jobs');
//startJobs();

// Router setup
const indexRouter = require('./routes/index');
const cityRouter = require('./routes/city');

// Initiate App
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Define use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  })
);

// Define route
app.use('/', indexRouter);
app.use('/', cityRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
