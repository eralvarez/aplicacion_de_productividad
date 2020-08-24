const configDb = require('../../../knexfile').development;

const knex = require('knex')({
    client: configDb.client,
    connection: {
        host: configDb.connection.host,
        user: configDb.connection.user,
        password: configDb.connection.password,
        database: configDb.connection.database,
        port: configDb.connection.port,
    }
});

async function main() {
    console.log('Dropping DB..');
    await knex.raw('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    knex.destroy();
    console.log('Dropping DB.. DONE!');
}

try {
    main();
} catch (error) {
    console.error(error);
}