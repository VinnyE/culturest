const passport = require('passport')
const TwitterStrategy = require('passport-twitter')
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (token, tokenSecret, profile, done) => {
  User.findOne({
    'twitter.id': profile.id
  }, (err, user) => {
    if (err) {
      return done(err)
    }

    if (!user) {
      var newUser = new User()

      newUser.twitter.token = token
      newUser.twitter.id = profile.id
      newUser.twitter.username = profile.username
      newUser.twitter.displayName = profile.displayName

      newUser.save(err => {
        if (err) {
          return done(err)
        }

        return done(err, user)
      })
    } else {
      return done(err, user)
    }
  })
}))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})
