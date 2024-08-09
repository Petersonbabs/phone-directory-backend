const users = require('../models/user.model');
const generateToken = require("../utils/jwt");
const bcrypt = require('bcryptjs')
const blacklistedTokens = require('../models/blacklistedTokens')



// REGISTER
const signUp = async (req, res, next) => { 

    try {
        const user = await users.create(req.body)
        if (!user) {
            res.status(404).json({
                status: "Fail",
                message: "Unable to sign up."
            })
        }

        const token = await generateToken(user.id, user.email)

        res.status(201).json({
            status: "success",
            message: "Sign up successful! Redirecting...",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        next(error);

    }
}

// Login user
const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {

        // Check for empty fields
        if (!email || !password) {
            res.status(401).json({
                status: 'error',
                message: 'Please complete the form.'
            })
            return
        }
        const user = await users.findOne({ email }).select('+password')
        if (!user) {
            res.status(403).json({
                status: 'error',
                message: 'Oops! You supplied incorrect details.'
            })
            return
        }

        // verify password & user account
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword || !user) {
            res.status(401).json({
                status: 'error',
                message: 'Oops! You supplied incorrect details.'
            })
            return
        }
        const token = generateToken(email, user._id);
        res.status(200).json({
            status: 'success',
            message: 'Login successful. Redirecting...',
            user,
            token
        })

    } catch (error) {
        console.log('Error occurred at login controller: ' + error);
        next(error)
    }
}

// logout
const logout = async (req, res, next) => {
    const { token } = req.body;
    try {
        if (!token) {
            return res.status(400).json({
                status: "fail",
                message: "Please supply token in request body",
            });
        }

        const blacklistedToken = await blacklistedTokens.create({ token });

        if (!blacklistedToken) {
            const error = new Error("Failed to blacklist token");
            error.statusCode = 500;
            return next(error);
        }

        res.status(200).json({
            status: "success",
            message: "Logout successful",
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

module.exports = { signUp, login, logout }
