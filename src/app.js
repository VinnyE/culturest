const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const promisify = require('es6-promisify')
const cors = require('cors')
const path = require('path')
const errorHandlers = require('./handlers/errorHandler')
const routes = require('./routes/index')
require('./handlers/passport')

// create our Express app
const app = express()

app.use(express.static(path.join(__dirname, '..', '..', 'client/build')))

app.use(cors())

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

// Sessions allow us to store data on visitors from request to request
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// // Passport JS is what we use to handle our logins
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

app.use('/', routes)

app.use(errorHandlers.mongoDBValidationErrors)

app.get('/*', (req, res) => {
  console.log('is this even being hit')
  res.sendFile(path.join(__dirname, '..', '..', 'client/build/index.html'))
})

module.exports = app
