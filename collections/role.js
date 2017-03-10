'use strict';

const Role = require('../models/role');
const Bookshelf = require('../bookshelf');

const RoleCollection = Bookshelf.Collection.extend({
    model: Role
});
module.exports = RoleCollection;