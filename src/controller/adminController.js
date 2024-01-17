const adminLayout = "./layouts/adminLayout.ejs";
const User = require('../model/userSchema')


module.exports = {

  getDashboard: async (req, res) => {
    const locals = {
      title: "User Management",
    };

    console.log(req.session.id)

    const messages = await req.flash("info");

    let perPage = 12;
    let page = req.query.page || 1;

    const users = await User.aggregate([{ $sort: { createdAt: -1} }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await User.countDocuments();

    res.render("admin/dashboard", {
      locals,
      admin: req.user,
      users,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      layout: adminLayout
    });
  },
  /**
   * USER - View, Edit, Delete 
   * USER - Block feature ?? PUT / or PATCH ?? 
   */
  
  viewUser: async (req,res) => {
    console.log(req.params)

    const user = await User.findById(req.params.id)

    if(user){
      res.render('admin/viewUser', {
        user: user,
        success: req.flash('success'),
        error: req.flash('error')
      })
    }
  },

  getEditUser: async (req,res) => {

    const locals = {
      title: 'Edit User'
    }

    console.log(req.params)

    const user = await User.findById(req.params.id)

    if(user){
      res.render('admin/editUser', {
        locals,
        user,
        success: req.flash('success'),
        error: req.flash('error')
      })
    }
  },
  getAdduser: async (req,res) => {

    const locals = {
      title: 'Add User'
    }

    res.render('admin/addUser', {
      locals,
      success: req.flash('success'),
      error: req.flash('error'),
      layout: adminLayout
    })
  },
  editUser: async (req,res) => {
    console.log(req.body)


  },
  
  addUser: async (req,res) => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      req.flash("error", "User already exists");
      console.log("User already exists");
      res.redirect("/admin/add-user");
    }

    if (pwd < 6 && pwdConf < 6) {
      req.flash("error", "Password is less than 6 character");
      res.redirect("/admin/add-user");
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
          res.redirect("/admin/add-user");
        } else {
          req.flash("error", "User not created");
          res.redirect("/admin/");
        }
      } else {
        req.flash("error", "Password does not match");
        console.log("Password does not match");
        res.redirect("/admin/add-user");
      }
    }

  },


};
