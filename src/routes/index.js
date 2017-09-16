const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const pinController = require('../controllers/pinController')

router.get('/user/logout', userController.logout)
router.get('/user/:id', authController.isAuthenticated, userController.getUserPins)

router.get('/auth/twitter', authController.authUser)
router.get('/auth/twitter/callback', authController.authUser, authController.authSuccess)

router.post('/pin/addpin', authController.isAuthenticated, pinController.addPin)
router.get('/pin/all', pinController.getAllPins)

module.exports = router
