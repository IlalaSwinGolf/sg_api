'use strict';

const bookshelf = require('../bookshelf');
const BaseModel = require('../helpers/base_model');

const Role = BaseModel.extend({
    tableName: 'roles',
    users: function() {
        return this.hasMany('User', 'role_id');
    },
});

module.exports = bookshelf.model('Role', Role);