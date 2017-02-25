
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () { return knex('users').insert({id: 1, role_id: '1', login: 'flocateur', email: 'flocateur@gmail.com', password: 'pwd'})})
    .then(function () { return knex('users').insert({id: 2, role_id: '2', login: 'amaujito' , email: 'amaujito@gmail.com' , password: 'pwd'})})
    .then(function () { return knex('users').insert({id: 3, role_id: '3', login: 'carlito'  , email: 'carlito@gmail.com'  , password: 'pwd'})})
    .then(function () { return knex('users').insert({id: 4, role_id: '4', login: 'maryam'   , email: 'maryam@gmail.com'   , password: 'pwd'})})
};