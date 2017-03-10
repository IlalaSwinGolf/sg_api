'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () { return knex('users').insert({role_id: 1, username: 'flocateur', email: 'flocateur@gmail.com', password: 'pwd'})})
    .then(function () { return knex('users').insert({role_id: 1, username: 'amaujito' , email: 'amaujito@gmail.com' , password: 'pwd'})})
    .then(function () { return knex('users').insert({role_id: 1, username: 'carlito'  , email: 'carlito@gmail.com'  , password: 'pwd'})})
    .then(function () { return knex('users').insert({role_id: 1, username: 'maryam'   , email: 'maryam@gmail.com'   , password: 'pwd'})})
};