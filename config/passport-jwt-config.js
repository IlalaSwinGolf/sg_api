'use strict';

const Passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SecurityConfig = require('./security-config');
const User = require('../models/user');

module.exports = function() {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = SecurityConfig.jwtSecret;
    Passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.where('id', jwt_payload.id).refresh({
                withRelated: 'role'
            })
            .then(user => user ? done(null, user) : done(null, false))
            .catch(err => done(err, false));
    }));
};