'use strict';

exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () { return knex('roles').insert({id: 1, status: 'root'})})
    .then(function () { return knex('roles').insert({id: 2, status: 'admin'})})
    .then(function () { return knex('roles').insert({id: 3, status: 'user'})})
    .then(function () { return knex('roles').insert({id: 4, status: 'guest'})})
};
