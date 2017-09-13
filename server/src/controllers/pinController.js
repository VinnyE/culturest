const mongoose = require('mongoose')
const Pin = mongoose.model('Pin')
const User = mongoose.model('User')

exports.addPin = async (req, res, next) => {
  const { url, description } = req.body

  let newPin = new Pin()
  newPin.user = req.user._id
  newPin.description = description
  newPin.imgURL = url

  try {
    const document = await newPin.save()
    const user = await User.findById(document.user)

    if (!user) return next()

    user.twitter.pins.push(document)
    await user.save()

    return res.json(document)
  } catch (err) {
    next(err)
  }
}
