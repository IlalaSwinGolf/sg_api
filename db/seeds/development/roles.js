
exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () { return knex('roles').insert({id: 1, colName: 'root'})})
    .then(function () { return knex('roles').insert({id: 2, colName: 'admin'})})
    .then(function () { return knex('roles').insert({id: 3, colName: 'user'})})
    .then(function () { return knex('roles').insert({id: 4, colName: 'guest'})})
};
