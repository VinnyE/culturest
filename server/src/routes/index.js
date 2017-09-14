const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const pinController = require('../controllers/pinController')

router.get('/user/logout', userController.logout)

router.get('/auth/me', authController.validateToken)
router.get('/auth/twitter', authController.authUser)
router.get('/auth/twitter/callback', authController.authUser, authController.authSuccess)

router.post('/pin/addpin', authController.authToken, pinController.addPin)
router.post('/pin/all', function (req, res, next) { console.log('test'); next() }, authController.authToken, pinController.getAllPins)

module.exports = router
