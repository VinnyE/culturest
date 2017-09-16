const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.logout = (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.cookie('token', '', {expires: new Date(0)})
    res.send({ success: true })
  }
}

exports.getUserPins = async (req, res, next) => {

  try {
    const { id } = req.params

    const user = await User.findById(id, 'twitter.username pins')
                            .populate('pins')

    if (!user) return res.send(404)

    res.json(user)
  } catch (err) {
    next(err)
  }
}
