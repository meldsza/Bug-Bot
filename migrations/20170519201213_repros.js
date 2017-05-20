
exports.up = function (knex, Promise) {
    return knex.schema.createTable('repros', function (t) {
        t.string('id').notNull();
        t.string('author').notNull();
        t.boolean('canRepro').notNull();
        t.text('message').notNull();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('repros');
};
