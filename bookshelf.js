'use strict';

const Config = require('./knexfile')[process.env.NODE_ENV];
const Knex = require('knex')(Config);
const Bookshelf = require('bookshelf')(Knex);

Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

module.exports = Bookshelf;