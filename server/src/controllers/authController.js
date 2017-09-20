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

  // There are more secure ways of doing this. Ex: http only cookie, x-auth header. 
  // For the purposes of this demo, I'll use this method as there's not really any real private data to protect.
  res.cookie('token', token)
  res.redirect('/')
}
