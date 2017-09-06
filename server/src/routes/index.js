const express = require('express')
const router = express.Router()
const passport = require('passport')

// router.get('/', function (req, res) {
//   res.json({ message: 'Home request received!' })
// })

router.get('/twitter', function (req, res, next) {
  console.log('testing')
  next()
}, passport.authenticate('twitter', {
  failureRedirect: '/',
  session: false
}))

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req, res, 'success')
    res.redirect('/')
  }
)

module.exports = router
