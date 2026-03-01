const express = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = express.Router()


/**
 * @route POST /api/auth/register
 * @description Register new user in app
 * @access Public
 */
authRouter.post('/register',authController.registerUserController )


/**
 * @route POST /api/auth/login
 * @description Will be used to login  into account using email and password
 * @access Public
 */
authRouter.post ("/login", authController.loginUserController)


/**
 * @route POST /api/auth/logout
 * @description Clear token from cookie and add token blacklist.
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController)


module.exports = authRouter