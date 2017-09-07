const express = require('express')
const router = express.Router()
const passport = require('passport')

// router.get('/', function (req, res) {
//   res.json({ message: 'Home request received!' })
// })

router.get('/twitter', function (req, res, next) {
  console.log('step 1')
  next()
}, passport.authenticate('twitter', {
  failureRedirect: '/',
  session: false
}))

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/', session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('step 2')
    res.redirect('/')
  }
)

module.exports = router
