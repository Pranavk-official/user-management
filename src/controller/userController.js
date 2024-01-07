module.exports = {
    getHome: (req,res) => {
        console.log(req.user);
        const locals = {
            title: 'Home Page'
        }


        res.render('index', {
            locals,
            success: req.flash("success"),
            error: req.flash("error"),
            user: req.user,
        })
    }
}