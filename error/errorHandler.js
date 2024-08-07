const passDevError = require("./devError");
const passProdError = require("./prodError");


// All errors middlewear
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV == "development") {
        
        passDevError(err, res)
    }
    else {
        passProdError(err, res)
    }
    next();
}

module.exports = errorHandler;