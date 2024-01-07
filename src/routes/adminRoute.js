const express = require('express')
const router = express.Router()

// Admin Controller
const adminController = require('../controller/adminController')
const { isAdmin, isAdminLoggedIn} = require('../middleware/authMiddleware')

router.get('/',  adminController.getDashboard)


module.exports = router