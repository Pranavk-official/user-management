const bcrypt = require("bcrypt");
const adminLayout = "./layouts/adminLayout.ejs";
const User = require("../model/userSchema");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  // User GET /
  // login register
  getUserLogin: (req, res) => {

    if(req.user){
      res.redirect('/')
    }

    const locals = {
      title: "User Login",
    };

    res.render("user/login", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  },
  getUserRegister: (req, res) => {
    const locals = {
      title: "User Register",
    };

    res.render("user/register", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  },
  // User POST /
  // login register
  userRegister: async (req, res) => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      req.flash("error", "User already exists, Please login");
      console.log("User already exists, Please login");
      res.redirect("/login");
    }

    if (pwd < 6 && pwdConf < 6) {
      req.flash("error", "Password is less than 6 character");
      res.redirect("/register");
    } else {
      if (pwd === pwdConf) {
        const hashpwd = await bcrypt.hash(pwd, 12);

        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashpwd,
        });

        if (user) {
          req.flash("success", "User successfully created!!");
          res.redirect("/login");
        } else {
          req.flash("error", "User not created");
          res.redirect("/register");
        }
      } else {
        req.flash("error", "Password does not match");
        console.log("Password does not match");
        res.redirect("/register");
      }
    }
  },

  userLogin: (req, res, next) => {
    // console.log(req.body);
    passport.authenticate("user-local", (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (!user) {
        console.log(info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.locals.user = req.user;
        return res.redirect("/");
      });
    })(req, res, next);
  },
  // Admin GET /
  // login register
  getAdminLogin: (req, res) => {
    const locals = {
      title: "Admin Login",
    };

    res.render("admin/login", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
      layout: adminLayout,
    });
  },
  getAdminRegister: (req, res) => {
    const locals = {
      title: "Admin Register",
    };

    res.render("admin/register", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
      layout: adminLayout,
    });
  },

  // POST /
  adminRegister: async (req, res) => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      req.flash("error", "User already exists, Please login");
      console.log("User already exists, Please login");
      res.redirect("/login");
    }

    if (pwd < 6 && pwdConf < 6) {
      req.flash("error", "Password is less than 6 character");
      res.redirect("/register");
    } else {
      if (pwd === pwdConf) {
        const hashpwd = await bcrypt.hash(pwd, 12);

        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashpwd,
          isAdmin: true,
        });

        if (user) {
          req.flash("success", "User successfully created!!");
          res.redirect("/admin/login");
        } else {
          req.flash("error", "User not created");
          res.redirect("/admin/register");
        }
      } else {
        req.flash("error", "Password does not match");
        console.log("Password does not match");
        res.redirect("/admin/register");
      }
    }
  },
  adminLogin: (req, res, next) => {
    passport.authenticate("admin-local", (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (!user) {
        console.log(info);
        return res.redirect("/admin/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.redirect("/admin");
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    if (req.user) {

      let isAdmin = req.user.isAdmin 

      // const role = req.user.isAdmin ? "User" : "Admin";
      req.logout((err) => {
        if (err) {
          console.log(err);
        } else {
          req.flash("success", `Logged Out!!`);
          if (isAdmin) res.redirect("/admin/login");
          else res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  },
};
