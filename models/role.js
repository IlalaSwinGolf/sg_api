'use strict';

const bookshelf = require('../bookshelf');
const Role = bookshelf.Model.extend({
    tableName: 'roles',
});

module.exports = bookshelf.model('Role', Role);