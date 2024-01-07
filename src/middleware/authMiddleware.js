// isLoggedIn , isLoggedOut
// isAdmin

const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
    isUser: (req,res,next) => {
        const token = req.cookies.jwt
        if(token){
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if(err){
                    // return res.status(401).json({message: 'Not Authorized'})
                    req.flash('error', 'Not Authorized')
                    res.redirect('/login')
                } else {
                    if(decodedToken.role !== 'User') {
                        // return res.status(401).json({message: 'Not Authorized'})
                        req.flash('error', 'Not Authorized')
                        res.redirect('/login')
                    }else{
                        next()
                    }
                }
            })
        }
    },
    isLoggedIn: (req,res,next) => {
        if(req.session && req.session.user){
            next()
        }else {
            req.flash('error', 'Not Authorized')
            res.redirect('/login')
        }
    },
    isAdminLoggedIn: (req,res,next) => {
        if(req.session && req.session.admin){
            next()
        }else {
            req.flash('error', 'Not Authorized')
            res.redirect('/login')
        }
    },
    isLoggedOut: (req,res,next) => {
        
    },
    isAdmin: (req,res,next) => {
        const token = req.cookies.jwt
        if(token){
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if(err){
                    // return res.status(401).json({message: 'Not Authorized'})
                    req.flash('error', 'Not Authorized')
                    res.redirect('/admin/login')
                } else {
                    if(decodedToken.role !== 'Admin') {
                        // return res.status(401).json({message: 'Not Authorized'})
                        req.flash('error', 'Not Authorized')
                        res.redirect('/admin/login')
                    }else{
                        next()
                    }
                }
            })
        }else {
            res.redirect('/admin/login')
        }
    },
}