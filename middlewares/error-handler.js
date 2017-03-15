'use strict';

module.exports = function(err, req, res, next) {
    if (process.env.NODE_ENV != "production") {
        console.log(err.stack);
    }
    res.status(err.status || 500);
    res.json({
        success: false,
        error: err.name,
        message: err.message,
    });
}