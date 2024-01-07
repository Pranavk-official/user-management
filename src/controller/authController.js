const bcrypt = require("bcrypt");
const adminLayout = "./layouts/adminLayout.ejs";
const User = require("../model/userSchema");
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  // User GET /
  // login register
  getUserLogin: (req, res) => {
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

  userLogin: async (req,res) => {
    const {email, pwd} = req.body

    if(!email || !pwd){
      req.flash('error', 'Email or Password not present!!!')
      res.redirect('/login')
    }

    const user = await User.findOne({email})

    if(!user){
      req.flash('error', 'User not found')
      res.redirect('/login')
    } else {
      const validPass = await bcrypt.compare(pwd, user.password)

      if(!validPass){
        
        req.flash('error', 'Invalid Credentials')
        res.redirect('/login')
      } else {

        const maxAge = 3 * 60 * 60 // 3hr expire
        const token = jwt.sign(
          {
            id: user._id,
            user,
            role: 'User'
          },
          jwtSecret,
          {
            expiresIn: maxAge,
          }
        )

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000
        });

        req.flash('success', 'Logged in successfully')
        req.session.user = user
        res.redirect('/')
      }
    }
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
  adminRegister: async (req,res) => {
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
          isAdmin: true
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
  adminLogin: async (req,res) => {
    const {email, pwd} = req.body

    if(!email || !pwd){
      req.flash('error', 'Email or Password not present!!!')
      res.redirect('/login')
    }

    const user = await User.findOne({email})

    if(!user){
      req.flash('error', 'User not found')
      res.redirect('/admin/login')
    } else {
      const validPass = await bcrypt.compare(pwd, user.password)

      if(!validPass){
        
        req.flash('error', 'Invalid Credentials')
        res.redirect('/admin/login')
      } else {

        const maxAge = 3 * 60 * 60 // 3hr expire
        const token = jwt.sign(
          {
            id: user._id,
            user,
            role: 'Admin'
          },
          jwtSecret,
          {
            expiresIn: maxAge,
          }
        )

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000
        });

        req.flash('success', 'Logged in successfully')
        req.session.admin = user
        res.redirect('/admin')
      }
    }
  },
};
