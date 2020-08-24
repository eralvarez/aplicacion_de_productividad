require('dotenv').config();

module.exports = {
    development: {
        client: process.env.DB_DIALECT,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_SCHEMA,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/db/migrations'
        },
        seeds: {
            directory: "./src/db/seeds"
        },
    },

    production: {
        client: process.env.DB_DIALECT,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_SCHEMA,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
