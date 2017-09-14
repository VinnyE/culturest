const mongoose = require('mongoose')
const Pin = mongoose.model('Pin')
const User = mongoose.model('User')

exports.addPin = async (req, res, next) => {
  try {
    const { url, description } = req.body

    let newPin = new Pin()
    newPin.user = req.user._id
    newPin.description = description
    newPin.imgURL = url

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

exports.getAllPins = async (req, res, next) => {
  try {
    const Pins = await Pin.find()

    if (!Pins) next()

    res.json(Pins)
    console.log(Pins)
  } catch (err) {
    next(err)
  }
}
