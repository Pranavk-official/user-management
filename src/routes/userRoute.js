const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const {  isLoggedIn, isAdminLoggedIn } = require('../middleware/authMiddleware')

// HomePage
router.get('/', isLoggedIn, userController.getHome)
router.get('/game', isLoggedIn, userController.getGame)


module.exports = router