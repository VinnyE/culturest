const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/me', function (req, res) {
  if (req.cookies && req.cookies.token) {
    let decodedUser = jwt.verify(req.cookies.token, process.env.SESSION)
    const dateNow = new Date()

    if ((decodedUser.exp * 1000) < dateNow.getTime()) {
      return res.send({ error: 'Token expired' })
    }

    return res.send({
      username: decodedUser.username
    })
  }
})

router.get('/logout', (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.cookie('token', '', {expires: new Date(0)})
    res.send({ success: true })
  }
})

router.get('/twitter', function (req, res, next) {
  next()
}, passport.authenticate('twitter', {
  failureRedirect: '/',
  session: false
}))

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/', session: false }),
  function (req, res) {
    const { _id, twitter } = req.user
    const { username } = twitter
    const token = jwt.sign({ _id, username }, process.env.SESSION, { expiresIn: 60 * 1440 })
    res.cookie('token', token)
    res.redirect('/me')
  }
)

module.exports = router
