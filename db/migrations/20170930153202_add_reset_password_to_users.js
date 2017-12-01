exports.up = function (knex, Promise) {
    return knex.schema.table('users', function (t) {
        t.string('restPasswordToken');
        t.date('resetPasswordExpires');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', function (t) {
        t.dropColumn('restPasswordToken');
        t.dropColumn('resetPasswordExpires');
    });
};