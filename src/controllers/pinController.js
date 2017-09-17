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

    const user = await User.findById(newPin.user)
    if (!user) return res.sendStatus(404)

    const document = await newPin.save()

    user.pins.push(document)
    await user.save()
    await document.populate('user', 'twitter.username twitter.avatar')
                  .execPopulate()

    return res.json(document)
  } catch (err) {
    next(err)
  }
}

exports.getAllPins = async (req, res, next) => {
  try {
    const pins = await Pin.find()
                          .populate('user', 'twitter.username twitter.avatar')

    if (!pins) next()

    res.json(pins)
  } catch (err) {
    next(err)
  }
}

exports.getUserPins = async (req, res, next) => {
  try {
    const { id } = req.params
    const pins = await Pin.find({'user': id})
                          .populate('user', 'twitter.username twitter.avatar')

    if (!pins) return res.sendStatus(404)

    res.json(pins)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.deletePin = async (req, res, next) => {
  try {
    const { id } = req.params
    const pin = await Pin.findOne({_id: id})
    let removedPin

    if (!pin) return res.sendStatus(404)

    if (String(pin.user) === String(req.user._id)) {
      removedPin = await pin.remove()
    }

    return res.json(removedPin)
  } catch (err) {
    next(err)
  }
}
