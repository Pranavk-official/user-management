const adminLayout = './layouts/adminLayout.ejs'


module.exports= {
    // User GET /
    // login register 
    getUserLogin: (req,res) => {
        const locals = {
            title: 'User Login'
        }
        
        res.render('user/login', {
            locals
        })
    },
    getUserRegister: (req,res) => {
        const locals = {
            title: 'User Register'
        }
    
        res.render('user/register', {
            locals
        })
        
    },
    // Admin GET /
    // login register
    getAdminLogin: (req,res) => {
        const locals = {
            title: 'Admin Login'
        }
    
        res.render('admin/login', {
            locals,
            layout: adminLayout
        })
    },
    getAdminRegister: (req,res) => {
        const locals = {
            title: 'Admin Register'
        }
    
        res.render('admin/register', {
            locals,
            layout: adminLayout
        })
    },
}