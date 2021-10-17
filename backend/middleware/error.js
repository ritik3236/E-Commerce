const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server error';

    // Wrong mongodb _Id error
    if (err.name === 'CastError') {
        const message = `Resource Not Found, Invalid ${err.path}`
        err = new ErrorHandler(message, 400);
    };

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);
    };

    // JSON WEB TOKEN  Error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web Token is Invalid, Try Again`
        err = new ErrorHandler(message, 400);
    };
    // JSON WEB TOKEN  Expire
    if (err.name === 'TokenExpiredError') {
        const message = `Json Web Token is Expired, Try Again`
        err = new ErrorHandler(message, 400);
    };

    res.status(err.statusCode).json({ success: false, message: err.message });
};