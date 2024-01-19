const express = require('express')
const router = express.Router()

// authController
const authController = require('../controller/authController')
const { isAdminLoggedOut, isLoggedOut } = require('../middleware/authMiddleware')

/**
 * User
 */

router
    .get('/login',  isLoggedOut, authController.getUserLogin)
    .post('/login', isLoggedOut, authController.userLogin)
router
    .get('/register', isLoggedOut, authController.getUserRegister)
    .post('/register', isLoggedOut, authController.userRegister)

/**
 * Admin
*/

router
    .get('/admin/login', isAdminLoggedOut, authController.getAdminLogin)
    .post('/admin/login', authController.adminLogin)
// router.get('/admin/register', isAdminLoggedOut, authController.getAdminRegister)

// router.post('/admin/register', authController.adminRegister)

// Logout
router.get('/logout', authController.logout)
router.get('/admin/logout', authController.adminLogout)


module.exports = router