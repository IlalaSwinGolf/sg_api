'use strict';

const Promise = require('bluebird');
const User = require('../models/user');
const CustomErrors = require('../helpers/custom-errors');

module.exports = {

    findAll: (req, res, next) => {
        Promise.coroutine(function*() {
            try {
                const users = yield User.findAll(req.query, {
                    withRelated: ['role']
                });
                res.status(200).json({
                    success: true,
                    data: users
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
    findOne: (req, res, next) => {
        Promise.coroutine(function*() {
            try {
                const user = yield User.findOne(req.params, {
                    withRelated: ['role']
                });
                res.status(200).json({
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
    update: (req, res, next) => {
        Promise.coroutine(function*() {
            try {
                let user = yield User.findOne({
                    "id": parseInt(req.params.id)
                }, {});
                if (user.id) {
                    user = yield user.update(req.user, req.body, {
                        patch: true, method: "update", require: true
                    });
                    res.status(200).json({
                        success: true,
                        data: user
                    });
                } else {
                    throw new CustomErrors.modelNotFOund(404, CustomErrors.messages.modelNotFound);
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