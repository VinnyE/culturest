const express = require('express')
const router = express.Router()
const passport = require('passport')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')

router.get('/me', function (req, res) {
  console.log(req.cookies)
  if (req.cookies && req.cookies.token) {
    let decodedUser = jwt.verify(req.cookies.token, process.env.SESSION)
    const dateNow = new Date()

    console.log(decodedUser)
    if ((decodedUser.exp * 1000) < dateNow.getTime()) {
      return res.send({ error: 'Token expired' })
    }

    return res.send({
      username: decodedUser.username
    })
  }
  // res.send(req)
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
    console.log(_id, username)
    const token = jwt.sign({ _id, username }, process.env.SESSION, { expiresIn: 60 * 5 })
    res.cookie('token', token, { httpOnly: true })
    res.redirect('/me')
  }
)

module.exports = router
