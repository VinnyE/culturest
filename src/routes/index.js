const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandler')

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const pinController = require('../controllers/pinController')

router.get('/user/logout', catchErrors(userController.logout))

router.get('/auth/me', catchErrors(authController.validateToken))
router.get('/auth/twitter', authController.authUser)
router.get('/auth/twitter/callback', authController.authUser, catchErrors(authController.authSuccess))

router.post('/pin/addPin', catchErrors(pinController.addPin))

module.exports = router
