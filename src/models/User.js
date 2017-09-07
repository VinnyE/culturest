const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String
  }
})

module.exports = mongoose.model('User', userSchema)
