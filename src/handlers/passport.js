const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
async function (token, tokenSecret, profile, done) {
  try {
    let user = await User.findOne({ 'twitter.id_str': profile.id })

    if (!user) {
      user = new User({
        name: profile.displayName,
        username: profile.username,
        provider: 'twitter',
        twitter: profile._json
      })

      const updatedUser = await user.save()
      console.log('save successful', user)
    }
    return done(null, user)
  } catch (err) {
    console.log('save not successful', err)
    return done(err)
  }
}
))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})
