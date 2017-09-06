const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  name: String,
  username: String,
  provider: String,
  twitter: String
})

module.exports = mongoose.model('User', userSchema)
