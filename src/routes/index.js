const express = require('express')
const router = express.Router()
const passport = require('passport')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')

// router.get('/', function (req, res) {
//   res.json({ message: 'Home request received!' })
// })

router.get('/twitter', function (req, res, next) {
  next()
}, passport.authenticate('twitter', {
  failureRedirect: '/',
  session: false
}))

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/', session: false }),
  function (req, res) {
    const { id } = req.user.id
    const token = jwt.sign({ id }, process.env.SESSION, { expiresIn: 60 * 5 })
    res.cookie('token', JSON.stringify(token), { httpOnly: true })
    res.redirect('/me')
  }
)

module.exports = router
