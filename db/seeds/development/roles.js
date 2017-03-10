'use strict';

exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () { return knex('roles').insert({status: 'root'})})
    .then(function () { return knex('roles').insert({status: 'admin'})})
    .then(function () { return knex('roles').insert({status: 'user'})})
    .then(function () { return knex('roles').insert({status: 'guest'})})
};
