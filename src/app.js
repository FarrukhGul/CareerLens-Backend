require('dotenv').config()
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

// middlewares
app.use(express.json());
app.use(cookieParser())

/* Require all the routes here.. */
const authRouter = require('../src/routes/auth.route')


/* using all the routes here */
app.use('/api/auth', authRouter)

module.exports = app