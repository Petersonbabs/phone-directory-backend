const jwt = require("jsonwebtoken");

const signJwt = async (id, email) => {
    
    const token = jwt.sign({ id, email }, process.env.jwtSecret, { expiresIn: process.env.jwtExpiresIn })

    return token
}

module.exports = signJwt