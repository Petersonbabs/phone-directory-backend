
const handleValidationErrors = (err, res) => {
    // Extract error messages from the validation error
    const errorMessages = Object.values(err.errors).map(error => error.message);

    // Return response with validation error messages
    return res.status(400).json({
        status: 'Failed',
        message: errorMessages[0]
    });
};



const sendDuplicateError = (err, res) => {
    const errKey = Object.keys(err.keyValue)[0]
    const errVal = Object.values(err.keyValue)[0]
    const message = `The ${errKey} ${errVal} already exists.`
    const error = new Error(message);
    error.statusCode = 400;

    return error

}

const sendCastError = (err, res) => {
    const message = `${err.path} ${err.value} is not valid`
    const error = new Error(message)
    return error
}

const handleProdError = (err, res) => {

    //  Duplicate Error
    if(err.code == 11000) {
        const error = sendDuplicateError(err)
        res.status(error.statusCode).json({
            status: "Failed",
            message: error.message
        })
    } else if (err.name == "CastError") {
        const error = sendCastError(err)
        
        res.status(404).json({
            error: error.message
        })

        return
    } else if(err.name === 'ValidationError') {
        return handleValidationErrors(err, res);
    }

}

module.exports = handleProdError