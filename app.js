require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Database connection 
const connectDB = require('./src/config/db')

const authRouter = require('./src/routes/authRoute');
const userRouter = require('./src/routes/userRoute');
const adminRouter = require('./src/routes/adminRoute');

/**
 * Auth - user - login, register 
 * Auth - admin - login, register
 * 
 * UserRoute - homepage 
 * AdminRoute - dashboard, edit, view, delete and search (create user)* 
 */

// Express App
const app = express();

// Connect Database
connectDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/userLayout')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
