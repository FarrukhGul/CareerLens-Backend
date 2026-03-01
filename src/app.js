require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

/* Require all the routes here.. */
const authRouter = require('../src/routes/auth.route')


/* using all the routes here */
app.use('/api/auth', authRouter)

module.exports = app