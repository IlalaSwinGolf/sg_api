'use strict';

const User = require('../models/user');
const Promise = require('bluebird');
const Jwt = require('jwt-simple');
const SecurityConfig = require('../config/security-config');
const CustomErrors = require('../helpers/custom-errors');

module.exports = {
    signup: (req, res, next) => {
        Promise.coroutine(function*() {
            try {
                let user = yield User.create(req.body, {});
                user = yield User.findOne({
                    id: user.id
                }, {
                    withRelated: ['role']
                });
                res.status(201).json({
                    success: true,
                    data: user
                });
            } catch (err) {
                if (err instanceof CustomErrors.genericError) {
                    next(err);
                } else {
                    next(new CustomErrors.applicationError(500, err.message));
                }
            }
        })();
    },
    signin: (req, res, next) => {
        const {
            username,
            password
        } = req.body;
        Promise.coroutine(function*() {
            try {
                const user = yield User.where('username', username).fetch();
                const isValidPassword = yield user.validPassword(password);
                if (isValidPassword) {
                    const token = Jwt.encode(user, SecurityConfig.jwtSecret);
                    res.status(200).json({
                        success: true,
                        token: `${token}`
                    });
                } else {
                    next(new CustomErrors.authenticationError(401, CustomErrors.messages.wrongPassword));
                }
            } catch (err) {
                if (err instanceof CustomErrors.genericError) {
                    next(err);
                } else {
                    next(new CustomErrors.applicationError(500, err.message));
                }
            }
        })();
    },
}