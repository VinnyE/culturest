const mongoose = require('mongoose')
const Pin = mongoose.model('Pin')
const User = mongoose.model('User')

exports.addPin = (req, res, next) => {
  const { url, description } = req.body

  let newPin = new Pin()
  newPin.user = req.user._id
  newPin.description = description
  newPin.imgURL = url

  newPin.save((err, document) => {
    if (err) next(err)

    User.findById(document._id, (err, user) => {
      if (err) next(err)

      user.pins.push(document)
      user.save((err) => {
        if (err) next(err)

        return res.json(document)
      })
    })
  })
}
