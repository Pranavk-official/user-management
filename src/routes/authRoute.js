const express = require('express')
const router = express.Router()

// authController
const authController = require('../controller/authController')
const { userRegisterValidationRules, validate } = require('../middleware/validationMiddleware');

const {  isLoggedIn, isAdminLoggedIn, isLoggedOut } = require('../middleware/authMiddleware')

/**
 * User
 */

// GET / 
router.get('/login',  isLoggedOut,authController.getUserLogin)
router.get('/register', isLoggedOut, authController.getUserRegister)

// POST / 
router.post('/login', isLoggedOut, authController.userLogin)
router.post('/register', isLoggedOut, authController.userRegister)

/**
 * Admin
*/

// GET /  
router.get('/admin/login', authController.getAdminLogin)
router.get('/admin/register', authController.getAdminRegister)

// POST /  
router.post('/admin/login', authController.adminLogin)
router.post('/admin/register', authController.adminRegister)

// Logout
router.get('/logout', authController.logout)
router.get('/admin/logout', authController.logout)


module.exports = router