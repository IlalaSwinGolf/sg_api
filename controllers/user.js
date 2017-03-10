'use strict';

const Promise = require('bluebird');
const User = require('../models/user');
const CustomErrors = require('../helpers/custom-errors');

module.exports = {

    fetchAll: (req, res, next) => {
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
    fetch: (req, res, next) => {
        Promise.coroutine(function*() {
            try {
                const user = yield User.findOne(req.params.id, {
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
}