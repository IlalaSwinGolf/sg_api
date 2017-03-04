const User = require('../models/user');
const Bookshelf = require('../bookshelf');

const UserCollection = Bookshelf.Collection.extend({
    model: User
});
module.exports = UserCollection;