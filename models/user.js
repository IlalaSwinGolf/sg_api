'use strict';

const bookshelf = require('../bookshelf');
const User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    role: function() {
        return this.belongsTo('Role', 'role_id');
    },
});

module.exports = bookshelf.model('User', User);