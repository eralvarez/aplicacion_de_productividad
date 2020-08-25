exports.up = function (knex) {
    return knex.schema
        .createTable('tasks', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('description', 255).notNullable();
            table.integer('duration').notNullable();
            table.integer('tookTimeToFinish');
            table.boolean('finished').defaultTo(false);
            table.timestamp('finishedAt');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('tasks');
};