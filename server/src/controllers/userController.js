const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.logout = (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.cookie('token', '', {expires: new Date(0)})
    res.send({ success: true })
  }
}
