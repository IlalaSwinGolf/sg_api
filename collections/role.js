const role = require('../models/role');
const bookshelf = require('../bookshelf');

const roleCollection = bookshelf.Collection.extend({
    model: role
});
module.exports = roleCollection;