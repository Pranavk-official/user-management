module.exports = {
    getHome: (req,res) => {
        const locals = {
            title: 'Home Page'
        }

        res.render('index', {
            locals,
        })
    }
}