"use strict";

const _ = require('lodash');
const CustomErrors = require ('../helpers/custom-errors');

const AuthorizedRoles = function(...authorizedRoles) {
    return function (req, res, next) {
        const currentUserRoles = req.user.related('roles').models.map(role => role.attributes.authority);
        if (!_.intersection(currentUserRoles, authorizedRoles).length) {
            throw new CustomErrors.forbiddenActionError(403, CustomErrors.messages.tooLowAuthority);
        }
        next();
    }
};

module.exports = AuthorizedRoles;