'use strict';
const passport = require('passport');
const CustomErrors = require('../helpers/custom-errors');

module.exports = function(req, res, next) {
    passport.authenticate("jwt", {
        failWithError: true,
        session: false
    }, function(err, user, info) {
        if (!user){
         return next(new CustomErrors.authenticationError(401,info.message)) ;
        } else {
         req.user=user;
         return next();
        }
    })(req,res,next);
}