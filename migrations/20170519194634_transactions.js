
exports.up = function (knex, Promise) {
    return knex.schema.createTable('transactions', function (t) {
        t.string('id').notNull();
        t.string('reason').notNull();
        t.integer('amount').notNull();
        t.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('transactions');
};
