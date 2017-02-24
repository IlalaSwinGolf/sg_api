exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('roles', function(table) {
        table.increments('id').unsigned().primary();
        table.string('name').unique().notNullable();
        table.timestamps();
    }).then(function(table) {
        console.log('Created Roles Table');
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('roles').then(function(table) {
        console.log('Dropped Roles Table');
    });
};