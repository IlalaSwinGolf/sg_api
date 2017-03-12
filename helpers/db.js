'use strict';

const config = require('../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(config);
const Promise = require('bluebird');


const DBHelper = {
    tables: ['roles'],
    truncate: function() {
        return Promise.each(DBHelper.tables, function(table) {
            return knex.raw('TRUNCATE table ' + table + ' RESTART IDENTITY CASCADE')
        });
    },
    seed: function() {
        return knex.seed.run();
    },
    rollback: function() {
        return knex.migrate.rollback();
    },
    migrate: function() {
        return knex.migrate.latest();
    }
};

module.exports = DBHelper;