const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8000

const carRoutes = require('./routes/car-routes')
//deprecation warning
mongoose.set('strictQuery', true)


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//starting an express app
const app = express()


app.use(cors({ origin: 'http://127.0.0.1:5501'}))

//sending json
///need to be able to accept json
app.use(express.json())

app.use(carRoutes)

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`)
})

module.exports = app