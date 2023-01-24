// require express
const express = require('express')
// require mongoose
const mongoose = require('mongoose')
// require cors
const cors = require('cors')
// require the URI
const db = require('./config/db')
// require the character routes
const characterRoutes = require('./routes/character-routes')
const requestLogger = require('./lib/request-logger')
const characterSeed = require('./lib/character-seed')
const campaignRoutes = require('./routes/campaign-routes')
const noteRoutes = require('./routes/note-routes')
const userRoutes = require('./routes/user-routes')
// 'Magic numbers' should always be declared at the top of the file and named in all caps
const PORT = 8000

// To avoid the deprecation warning set `strictQuery` to true
mongoose.set('strictQuery', true)

// Create connection with the URI from config/db.js
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Using the express function create an express app
const app = express()

// before any request come in whitelist our front end localhost
app.use(cors({ origin: `http://127.0.0.1:5500` }))

// For Express to accept the content type of json we have to use `express.json()` middleware and pass it to `app.use`
app.use(express.json())
app.use(requestLogger)

// Pass the routes to `app.use` for Express to use them
app.use(characterRoutes)
app.use('/seed', characterSeed)
app.use(campaignRoutes)
app.use(noteRoutes)
app.use(userRoutes)

// To run the server you will always need `app.listen`
// Listening on PORT 8000
app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})

// exporting app to use elsewhere
module.exports = app