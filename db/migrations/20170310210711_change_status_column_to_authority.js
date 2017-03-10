'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table('roles', function(table) {
        table.renameColumn('status', 'authority');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('roles', function(table) {
        table.renameColumn('authority', 'status');
    });
};