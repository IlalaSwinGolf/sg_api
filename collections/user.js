const user = require('../models/user');
const bookshelf = require('../bookshelf');

const userCollection = bookshelf.Collection.extend({
    model: user
});
module.exports = userCollection;