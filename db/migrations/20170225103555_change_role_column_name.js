exports.up = function(knex, Promise) {
    return knex.schema.table('roles', function(table) {
        table.renameColumn('name', 'status');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('roles', function(table) {
        table.renameColumn('status', 'name');
    });
};