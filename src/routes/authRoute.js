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

router.route('/admin/login')
    .get(isAdminLoggedOut, authController.getAdminLogin)
    .post( authController.adminLogin)

router.route('/admin/register')
    .get(isAdminLoggedOut, authController.getAdminRegister)
    .post(authController.adminRegister)

// Logout
router.get('/logout', authController.logout)
router.get('/admin/logout', authController.adminLogout)


module.exports = router