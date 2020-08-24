const knexCleaner = require('knex-cleaner');

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
    console.log('Cleaning DB..');
    await knexCleaner.clean(knex);
    knex.destroy();
    console.log('Cleaning DB.. DONE!');
}

try {
    main();
} catch (error) {
    console.error(error);
}