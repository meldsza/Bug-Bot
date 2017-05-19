
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (t) {
        t.string('id').notNull();
        t.string('android').nullable();
        t.string('windows').nullable();
        t.string('macOS').nullable();
        t.string('iOS').nullable();
        t.string('linux').nullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
