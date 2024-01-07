const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const { isAdmin, isUser, isLoggedIn, isLoggedOut} = require('../middleware/authMiddleware')

// HomePage
router.get('/', isUser, isLoggedIn,userController.getHome)


module.exports = router