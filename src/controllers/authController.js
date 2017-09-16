const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.authUser = passport.authenticate('twitter', {
  failureRedirect: '/',
  session: false
})

exports.isAuthenticated = passport.authenticate('jwt', {
  failureRedirect: '/',
  session: false
})

exports.authSuccess = (req, res) => {
  const { _id, twitter } = req.user
  const { username } = twitter
  const token = jwt.sign({ _id, username }, process.env.SESSION, { expiresIn: 60 * 1440 })
  console.log('success', token)
  res.cookie('token', token)
  res.redirect('/')
}
