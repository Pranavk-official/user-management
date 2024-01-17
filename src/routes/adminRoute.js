const express = require('express')
const router = express.Router()

// Admin Controller
const adminController = require('../controller/adminController')
const { isAdminLoggedIn} = require('../middleware/authMiddleware')

router.get('/',  isAdminLoggedIn, adminController.getDashboard)
router.get('/view/:id',  isAdminLoggedIn, adminController.viewUser)
router.get('/edit/:id',  isAdminLoggedIn, adminController.getEditUser)

// POST /
router.post('/edit/:id',  isAdminLoggedIn, adminController.editUser)


module.exports = router