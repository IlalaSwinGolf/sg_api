'use strict';

const Bookshelf = require('../bookshelf');

const Model = Bookshelf.Model.extend({
    hasTimestamps: true,
}, {
    findAll: function(filter, options) {
        return this.forge().where(filter).fetchAll(options);
    },

    findOne: function(query, options) {
        return this.forge(query).fetch(options);
    },

    create: function(data, options) {
        return this.forge(data).save(null, options);
    },
});

module.exports = Bookshelf.model('BaseModel', Model);