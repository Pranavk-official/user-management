const express = require('express')
const router = express.Router()

// authController
const authController = require('../controller/authController')
const { userRegisterValidationRules, validate } = require('../middleware/validationMiddleware');



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

module.exports = router