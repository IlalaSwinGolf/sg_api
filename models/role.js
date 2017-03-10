'use strict';

const Bookshelf = require('../bookshelf');
const BaseModel = require('../helpers/base-model');

const Role = BaseModel.extend({
    tableName: 'roles',
    users: function() {
        return this.hasMany('User', 'role_id');
    },
});

module.exports = Bookshelf.model('Role', Role);