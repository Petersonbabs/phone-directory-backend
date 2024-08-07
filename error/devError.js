// errors for development comes here 
const handleDevError = (err, res) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        status: "faIL",
        message: errMsg,
        stack: err.stack,
        error: err
    })

   
    
}


module.exports = handleDevError