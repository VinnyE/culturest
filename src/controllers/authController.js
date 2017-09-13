const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.validateToken = (req, res) => {
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
}

exports.authUser = passport.authenticate('twitter', {
  failureRedirect: '/',
  session: false
})

exports.authToken = passport.authenticate('jwt', {
  failureRedirect: '/',
  session: false
})

exports.authSuccess = (req, res) => {
  const { _id, twitter } = req.user
  const { username } = twitter
  const token = jwt.sign({ _id, username }, process.env.SESSION, { expiresIn: 60 * 1440 })
  res.cookie('token', token)
  res.redirect('/me')
}
