const adminLayout = "./layouts/adminLayout.ejs";
const User = require('../model/userSchema')


module.exports = {
  getDashboard: async (req, res) => {
    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };

    const messages = await req.flash("info");

    let perPage = 12;
    let page = req.query.page || 1;

    const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await User.countDocuments();

    res.render("admin/dashboard", {
      locals,
      users,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      layout: adminLayout
    });
  },
};
