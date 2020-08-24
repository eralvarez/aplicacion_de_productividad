import { IConfig } from './config.interface';

const config: IConfig = {
    environment: process.env.NODE_ENV,
    server: {
        port: parseInt(process.env.SERVER_PORT),
    },
    database: {
        host: process.env.DB_HOST,
        schema: process.env.DB_SCHEMA,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
    },
    redisDatabase: {
        host: process.env.REDIS_DB_HOST,
        port: parseInt(process.env.REDIS_DB_PORT),
        password: process.env.REDIS_DB_PASSWORD,
    },
    randomSalt: process.env.RANDOM_SALT,
};

export { config };
