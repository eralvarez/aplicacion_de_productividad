import { promisify } from 'util';
import * as knex from 'knex';
import * as redis from 'redis';

import { config } from '@env/config';

let knexConnection = null;
let authRedisConnection = null;
let endpointCacheRedisConnection = null;

async function createDbConnection() {
    try {
        knexConnection = knex({
            client: config.database.dialect,
            connection: {
                host: config.database.host,
                port: config.database.port,
                database: config.database.schema,
                user: config.database.user,
                password: config.database.password,
            }
        });

        await knexConnection.raw('SELECT 1 + 1 AS result');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

function getDbConnection() {
    return knexConnection;
}

async function createAuthRedisConnection() {
    authRedisConnection = redis.createClient({
        host: config.redisDatabase.host,
        port: config.redisDatabase.port,
        password: config.redisDatabase.password,
        db: 0,
    });

    authRedisConnection.on('error', (error) => {
        console.error(error);
        process.exit(1);
    });

    authRedisConnection.on('connect', () => {
        authRedisConnection = promifyRedisClient(authRedisConnection);
    });
}

async function createEndpointCacheRedisConnection() {
    endpointCacheRedisConnection = redis.createClient({
        host: config.redisDatabase.host,
        port: config.redisDatabase.port,
        password: config.redisDatabase.password,
        db: 1,
    });

    endpointCacheRedisConnection.on('error', (error) => {
        console.error(error);
        process.exit(1);
    });

    endpointCacheRedisConnection.on('connect', () => {
        endpointCacheRedisConnection = promifyRedisClient(endpointCacheRedisConnection);
    });
}

function getRedisConnection() {
    return {
        authRedisConnection,
        endpointCacheRedisConnection,
    };
}

function promifyRedisClient(redisClient) {

    const functionNamesToPromify = [
        'set',
        'get',
    ];

    for (let functionNameIndex = 0; functionNameIndex < functionNamesToPromify.length; functionNameIndex++) {
        const functionName = functionNamesToPromify[functionNameIndex];
        redisClient[`${functionName}Async`] = promisify(redisClient[functionName]).bind(redisClient)
    }

    return redisClient;
}

async function connectToDbs() {
    await createDbConnection();
}

export {
    createDbConnection,
    getDbConnection,
    createAuthRedisConnection,
    createEndpointCacheRedisConnection,
    getRedisConnection,
    connectToDbs,
};
