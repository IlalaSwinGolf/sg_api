exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function(table) {
        table.increments('id').unsigned().primary();
        table.integer('role_id').unsigned().index().references('id').inTable('roles').onDelete("CASCADE");
        table.string('login').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.boolean('disabled').defaultTo(false);
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('users');
};