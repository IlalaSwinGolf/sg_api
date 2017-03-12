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

    role: function() {
        return this.belongsTo('Role', 'role_id');
    },
    assertUsernameIsUnique: function(model, attrs, options) {
        if (!model.hasChanged('username')) return;
        return Promise.coroutine(function*() {
            const user = yield User.findOne({
                username: model.attributes.username
            }, {});
            if (user) {
                throw new CustomErrors.duplicateEntryError(422, CustomErrors.messages.nonUniqueUsername);
            }
        })();
    },
    assertEmailIsUnique: function(model, attrs, options) {
        if (!model.hasChanged('email')) return;
        return Promise.coroutine(function*() {
            const user = yield User.findOne({
                email: model.attributes.email
            }, {});
            if (user) {
                throw new CustomErrors.duplicateEntryError(422, CustomErrors.messages.nonUniqueEmail);
            }
        })();
    },
    assertDisabledIsSetToFalse: function(model, attrs, options) {
        if (!model.hasChanged('disabled')) return;
        if (model.attributes.disabled == false) {
            throw new CustomErrors.forbiddenActionError(422, CustomErrors.messages.nonDisabledUserOnCreation);
        }
    },
    validPassword(password) {
        return Bcrypt.compareAsync(password, this.attributes.password);
    },
    hashPassword: function(model, attrs, options) {
        return Promise.coroutine(function*() {
            if (!model.hasChanged('password')) return;
            const salt = yield Bcrypt.genSaltAsync(SecurityConfig.saltRounds);
            const hashedPassword = yield Bcrypt.hashAsync(model.attributes.password, salt);
            model.set('password', hashedPassword);
        })();
    },
    initialize() {
        this.on('creating', this.assertDisabledIsSetToFalse);
        this.on('saving'  , this.assertUsernameIsUnique);
        this.on('saving'  , this.assertEmailIsUnique);
        this.on('saving'  , this.hashPassword);
    }
});

module.exports = Bookshelf.model('User', User);