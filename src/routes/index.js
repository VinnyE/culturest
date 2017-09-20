const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const pinController = require('../controllers/pinController')

router.get('/user/logout', userController.logout)

router.get('/auth/twitter', authController.authUser)
router.get('/auth/twitter/callback', authController.authUser, authController.authSuccess)

router.get('/pin/user/:id', pinController.getUserPins)
router.post('/pin/addpin', authController.isAuthenticated, pinController.addPin)
router.get('/pin/all', pinController.getAllPins)
router.delete('/pin/delete/:id', authController.isAuthenticated, pinController.deletePin)

module.exports = router
