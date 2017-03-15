'use strict';

const express = require('express');
const userController = require('../controllers/user');
const apiRoutes = express.Router();
const passport = require('passport');
const CustomErrors = require('../helpers/custom-errors');


apiRoutes.get('/', userController.findAll);
apiRoutes.get('/:id', userController.findOne);
apiRoutes.put('/:id', function(req, res, next) {
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
}, userController.update);

module.exports = apiRoutes;