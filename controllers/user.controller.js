const users = require('../models/user.model');
const signJwt = require("../utils/jwt");



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

        const token = await signJwt(user.id, user.email)

        res.status(201).json({
            status: "Success",
            message: "Sign up successful! Redirecting...",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        next(error);

    }
}

module.exports = { signUp }
