const express = require('express')
const router = express.Router()

// Admin Controller
const adminController = require('../controller/adminController')
const { isAdminLoggedIn} = require('../middleware/authMiddleware')

router.get('/',  isAdminLoggedIn, adminController.getDashboard)
router
    .get('/add-user',  isAdminLoggedIn, adminController.getAddUser)
    .post('/add-user',  isAdminLoggedIn, adminController.addUser)

router.get('/view/:id',  isAdminLoggedIn, adminController.viewUser)
router
    .get('/edit/:id',  isAdminLoggedIn, adminController.getEditUser)
    .post('/edit/:id',  isAdminLoggedIn, adminController.editUser)
    .delete('/edit/:id',  isAdminLoggedIn, adminController.deleteUser)


module.exports = router