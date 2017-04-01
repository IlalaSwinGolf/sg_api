'use strict';

const Passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SecurityConfig = require('./security-config');
const User = require('../models/user');
const Promise = require('bluebird');
const CustomErrors = require('../helpers/custom-errors');

module.exports = function() {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = SecurityConfig.jwtSecret;
    Passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Promise.coroutine(function*() {
            try {
                const user = yield User.findOne({'id': jwt_payload.id}, {
                    withRelated: 'role'
                })
                user ? done(null, user) : done(null, false);
            } catch (err) {
                done(err, false);
            }
        })();
    }));
};