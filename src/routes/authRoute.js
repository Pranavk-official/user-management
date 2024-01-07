const express = require('express')
const router = express.Router()

// authController
const authController = require('../controller/authController')
const { userRegisterValidationRules, validate } = require('../middleware/validationMiddleware');

const { isAdmin, isUser, isLoggedIn, isLoggedOut} = require('../middleware/authMiddleware')

/**
 * User
 */

// GET / 
router.get('/login', authController.getUserLogin)
router.get('/register', authController.getUserRegister)

// POSR / 
router.post('/login', authController.userLogin)
router.post('/register', authController.userRegister)

/**
 * Admin
*/

// GET /  
router.get('/admin/login', authController.getAdminLogin)
router.get('/admin/register', authController.getAdminRegister)

// GET /  
router.post('/admin/login', authController.adminLogin)
router.post('/admin/register', authController.adminRegister)

module.exports = router