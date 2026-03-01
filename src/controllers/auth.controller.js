const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blacklist.model')




/**
 * @name {*} registerController 
 * @description register the new user and expects {username, email, password} in body from the 
 * frontend
 * @access Public 
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please Provide Username, Email and Password."
        })
    };



    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email or username."
        })
    };

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        { id: user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered Successfully...",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
};


/**
 * @name {*} loginUserController 
 * @description use to login the user and expects {email, password} in body from the 
 * frontend
 * @access Public 
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password."
        })
    };


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Password."
        })
    };
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in successfully..",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


/**
 * @name {*} logoutUserController 
 * @description use to logout the user 
 * @access Public 
 */
async function logoutUserController(req, res){
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message : "User Logout Successfully..."
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}