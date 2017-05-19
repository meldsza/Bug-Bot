
exports.up = function (knex, Promise) {
    return knex.schema.createTable('reports', function (t) {
        t.integer('id').notNull();
        t.string('header').notNull();
        t.text('steps').notNull();
        t.string('expected').notNull();
        t.string('actual').notNull();
        t.string('client').notNull();
        t.string('system').notNull();
        t.string('author').notNull();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('reports');
};
