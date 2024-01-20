module.exports = {
    getHome: (req,res) => {
        // console.log(req.user);
        const locals = {
            title: 'Home Page'
        }

        console.log(req.session.id);
        
        res.render('index', {
            locals,
            success: req.flash("success"),
            error: req.flash("error"),
            user: req.user,
        })
    },
    getGame: (req,res)=> {
        const locals = {
            title: 'Dragon Repeller'
        }

        console.log(req.session.id);
        
        res.render('user/game', {
            locals,
            success: req.flash("success"),
            error: req.flash("error"),
            user: req.user,
        })
    }
}