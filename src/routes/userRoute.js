const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

// HomePage
router.get('/', userController.getHome)


module.exports = router