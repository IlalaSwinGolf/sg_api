'use strict';
const config = require('./knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); 

module.exports = bookshelf;