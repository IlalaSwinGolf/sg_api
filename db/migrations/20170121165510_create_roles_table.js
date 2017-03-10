'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('roles', function(table) {
        table.increments('id').unsigned().primary();
        table.string('name').unique().notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('roles')
};