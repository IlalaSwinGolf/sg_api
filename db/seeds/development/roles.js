'use strict';

exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () { return knex('roles').insert({authority: 'root'})})
    .then(function () { return knex('roles').insert({authority: 'admin'})})
    .then(function () { return knex('roles').insert({authority: 'user'})})
    .then(function () { return knex('roles').insert({authority: 'guest'})})
};
