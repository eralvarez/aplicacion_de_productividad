exports.up = function (knex) {
    return knex.schema
        .createTable('system_endpoints', function (table) {
            table.increments('id');
            table.string('route', 255).notNullable();
            table.enu('method', ['GET', 'POST', 'PUT', 'DELETE']);
            table.json('config');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('system_endpoints');
};