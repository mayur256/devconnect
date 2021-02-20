const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const db = require('./config/keys').mongoURI

//getting all the routes in server.js
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const posts = require('./routes/api/posts')


const app = express()

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Connect to mongo db
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("DB Connected!")
    })
    .catch(error => {
        console.log(error)
    })

//Register Passport middleware
app.use(passport.initialize())

//Passport Configuration
require('./config/passport')(passport)

const port = process.env.PORT || 5000

app.use('/users', users)
app.use('/profiles', profiles)
app.use('/posts', posts)

app.listen(port, () => console.log(`Server running on port ${port}`))