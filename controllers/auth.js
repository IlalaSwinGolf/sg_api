'use strict';

const User = require('../models/user');
const Promise = require('bluebird');
const Jwt = require('jwt-simple');
const SecurityConfig = require('../config/security-config');
const CustomErrors = require('../helpers/custom-errors');
const Mailer = require('../helpers/mailer');
const Crypto = require('crypto');
const Moment = require('moment');


module.exports = {
    signup: (req, res, next) => {
        Promise.coroutine(function* () {
            try {
                if ("role_id" in req.body || "disabled" in req.body) throw new CustomErrors.forbiddenActionError(403, CustomErrors.messages.tooLowAuthority);
                let user = yield User.create(req.body, {});
                user = yield User.findOne({
                    id: user.id
                }, {
                    withRelated: ['role']
                });
                let token = Crypto.randomBytes(64).toString('hex');

                user = yield user.save({
                    'restPasswordToken': token,
                    'resetPasswordExpires': Moment().add(1, 'h')
                }, {
                    patch: true,
                    method: "update",
                    require: true
                });
                if (process.env.NODE_ENV !== 'test') {
                    let host = process.env.API_HOST || 'http://localhost:8000';
                    let URL = host + req.originalUrl + '/validate/' + user.attributes.restPasswordToken;

                    let mailOptions = {
                        from: 'support@swinscore.net',
                        to: user.attributes.email,
                        subject: 'Activation de votre compte swinscore.net',
                        html: 'Cliquer sur le lien suivant pour activer votre compte:<p><a href=' + URL + '>Lien </a></p>!'
                    };
                    Mailer.send(mailOptions, function (err, info) {
                        if (err) {
                            next(err);
                        } else {
                            res.status(201).json({
                                success: true,
                                data: user,
                                message: info.response
                            });
                        }
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: user
                    });
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
    signin: (req, res, next) => {
        const {
            username,
            password
        } = req.body;
        Promise.coroutine(function* () {
            try {
                const user = yield User.findOne({
                    'username': username
                }, {});
                if (!user) throw new CustomErrors.authenticationError(401, CustomErrors.messages.userNotFound);
                const isValidPassword = yield user.validPassword(password);
                if (isValidPassword) {
                    const token = Jwt.encode(user, SecurityConfig.jwtSecret);
                    res.status(200).json({
                        success: true,
                        token: `JWT ${token}`
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
    validate: (req, res, next) => {
        Promise.coroutine(function* () {
            try {
                let user = yield User.findOne({
                    'restPasswordToken': req.params.token
                }, {});
                if (user) {
                    if (Moment().isAfter(user.resetPasswordExpires)) {
                        throw new CustomErrors.tokenExpired(404, CustomErrors.messages.tokenExpired);
                    }
                    user = yield user.save({
                        'disabled': false,
                        'restPasswordToken': null,
                        'resetPasswordExpires': null
                    }, {
                        patch: true,
                        method: "update",
                        require: true
                    });
                    res.status(200).json({
                        success: true,
                        data: user
                    });
                } else {
                    throw new CustomErrors.modelNotFoundError(404, CustomErrors.messages.modelNotFound);
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