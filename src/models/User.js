const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  twitter: {
    id: String,
    token: String,
    avatar: String,
    username: String,
    displayName: String
  },
  pins: [{type: Schema.Types.ObjectId, ref: 'Pin'}]
})

module.exports = mongoose.model('User', userSchema)
