'use strict';

const Bookshelf = require('../bookshelf');
const Promise = require('bluebird');
const Bcrypt = Promise.promisifyAll(require('bcrypt'));
const BaseModel = require('../helpers/base-model');
const SecurityConfig = require('../config/security-config');
const CustomErrors = require('../helpers/custom-errors');

const User = BaseModel.extend({

    tableName: 'users',
    hidden: ['password', 'role_id'],

    update: function (currentUser, fields, options) {
        if (currentUser.canUpdate(this, fields)) {
            if (fields.hasOwnProperty("role_id")) {
                fields.role_id = parseInt(fields.role_id);
            }
            return this.save(fields, options);
        }
    },
    canUpdate: function (userToUpdate, fields) {
        return this.canUpdateRestrictedFields(userToUpdate, fields) && this.canDisableAnUser(fields) && this.canUpdateRole(fields);
    },
    canDisableAnUser: function (fields) {
        if (fields.hasOwnProperty("disabled")) {
            if (!this.isAtLeastAdmin()) {
                throw new CustomErrors.forbiddenActionError(401, CustomErrors.messages.tooLowAuthority);
            }
        }
        return true;
    },
    canUpdateRestrictedFields: function (userToUpdate, fields) {
        if (this.id != userToUpdate.id && (fields.hasOwnProperty("username") || fields.hasOwnProperty("password") || fields.hasOwnProperty("email"))) {
            throw new CustomErrors.forbiddenActionError(401, CustomErrors.messages.restrictedFields);
        }
        return true;
    },
    canUpdateRole: function (fields) {
        if (fields.hasOwnProperty("role_id")) {
            if (this.isAtLeastAdmin() && this.related('role').isPowerfull(fields.role_id)) {
                return true;
            }
            throw new CustomErrors.forbiddenActionError(401, CustomErrors.messages.tooLowAuthority);
        }
        return true;
    },
    isAtLeastAdmin: function () {
        return this.hasAdminAuthority() || this.hasRootAuthority();
    },
    role: function () {
        return this.belongsTo('Role', 'role_id');
    },
    hasRootAuthority: function () {
        return this.related('role').attributes.authority == "root";
    },
    hasAdminAuthority: function () {
        return this.related('role').attributes.authority == "admin";
    },
    hasUserAuthority: function () {
        return this.related('role').attributes.authority == "user";
    },
    assertUsernameIsUnique: function (model, attrs, options) {
        if (!model.hasChanged('username')) return;
        return Promise.coroutine(function* () {
            const user = yield User.findOne({
                username: model.attributes.username
            }, {});
            if (user) {
                throw new CustomErrors.duplicateEntryError(422, CustomErrors.messages.nonUniqueUsername);
            }
        })();
    },
    assertEmailIsUnique: function (model, attrs, options) {
        if (!model.hasChanged('email')) return;
        return Promise.coroutine(function* () {
            const user = yield User.findOne({
                email: model.attributes.email
            }, {});
            if (user) {
                throw new CustomErrors.duplicateEntryError(422, CustomErrors.messages.nonUniqueEmail);
            }
        })();
    },
    validPassword(password) {
        return Bcrypt.compareAsync(password, this.attributes.password);
    },
    hashPassword: function (model, attrs, options) {
        return Promise.coroutine(function* () {
            if (!model.hasChanged('password')) return;
            const salt = yield Bcrypt.genSaltAsync(SecurityConfig.saltRounds);
            const hashedPassword = yield Bcrypt.hashAsync(model.attributes.password, salt);
            model.set('password', hashedPassword);
        })();
    },
    initialize() {
        this.on('saving', this.assertUsernameIsUnique);
        this.on('saving', this.assertEmailIsUnique);
        this.on('saving', this.hashPassword);
    }
});

module.exports = Bookshelf.model('User', User);