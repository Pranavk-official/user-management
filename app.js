require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const { v4: uuidv4 } = require("uuid");
const MongoStore = require("connect-mongo");
const nocache = require("nocache");
const methodOverride = require("method-override");
const passport = require("./src/config/passport-config");

// Database connection
const connectDB = require("./src/config/db");

const authRouter = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");
const adminRouter = require("./src/routes/adminRoute");


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
connectDB();

// view engine setup
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "./layouts/userLayout");

app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 2 * 60 * 60,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 2 * 60 * 60 ,
    }),
    cookie: {
      maxAge: 3 * 60 * 60,
    },
  })
);

// passport js
app.use(flash());

// passport js
app.use(passport.initialize());
app.use(passport.session());


app.use(nocache());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error pagesw
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
