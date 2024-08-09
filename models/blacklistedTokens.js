const { Schema, model } = require('mongoose')

const tokenSchema = Schema({
    token: {
        type: String
    }
})

module.exports = model('blacklistedTokens', tokenSchema)