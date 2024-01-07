const express = require('express')
const router = express.Router()

// authController
const authController = require('../controller/authController')


/**
 * User
 */

// GET / 
router.get('/login', authController.getUserLogin)
router.get('/register', authController.getUserRegister)

/**
 * Admin
*/

// GET /  
router.get('/admin/login', authController.getAdminLogin)
router.get('/admin/register', authController.getAdminRegister)

module.exports = router