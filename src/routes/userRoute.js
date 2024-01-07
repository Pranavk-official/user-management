const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const {  isLoggedIn, isAdminLoggedIn } = require('../middleware/authMiddleware')

// HomePage
router.get('/', isLoggedIn,userController.getHome)


module.exports = router