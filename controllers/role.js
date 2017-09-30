'use strict';

const Promise = require('bluebird')
const Role = require('../models/role');
const CustomErrors = require('../helpers/custom-errors');

module.exports = {

    findAll: (req, res, next) => {
        Promise.coroutine(function*() {
            try {
                const roles = yield Role.findAll(req.query, {});
                res.status(200).json({
                    success: true,
                    data: roles
                });
            } catch (err) {
                if (err instanceof CustomErrors.genericError) {
                    next(err);
                } else {
                    next(new CustomErrors.applicationError(500, err.message));
                };
            }
        })();
    }
}