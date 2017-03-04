
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () { return knex('users').insert({id: 1, role_id: 1, username: 'flocateur', email: 'flocateur@gmail.com', password: 'pwd'})})
    .then(function () { return knex('users').insert({id: 2, role_id: 1, username: 'amaujito' , email: 'amaujito@gmail.com' , password: 'pwd'})})
    .then(function () { return knex('users').insert({id: 3, role_id: 1, username: 'carlito'  , email: 'carlito@gmail.com'  , password: 'pwd'})})
    .then(function () { return knex('users').insert({id: 4, role_id: 1, username: 'maryam'   , email: 'maryam@gmail.com'   , password: 'pwd'})})
};