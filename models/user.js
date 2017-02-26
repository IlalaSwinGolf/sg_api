'use strict';

const bookshelf = require('../bookshelf');
const BaseModel = require('../helpers/base_model');

const User = BaseModel.extend({
    tableName: 'users',
    hidden: ['password', 'role_id'],
    role: function() {
        return this.belongsTo('Role', 'role_id');
    },
});

module.exports = bookshelf.model('User', User);