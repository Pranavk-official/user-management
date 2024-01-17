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
  editUser: async (req,res) => {
    console.log(req.body)


  },


};
