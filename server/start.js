const mongoose = require('mongoose')

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' })

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
})
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`)
})

require('./src/models/User')
require('./src/models/Pin')

// Start the app
const app = require('./src/app')
app.set('port', process.env.PORT || 7777)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})