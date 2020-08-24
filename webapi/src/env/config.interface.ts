interface IConfigService {
    port: number;
}

interface IConfigDatabase {
    host: string,
    schema: string,
    user: string,
    password: string,
    port: number,
    dialect: string,
}

interface IConfigRedisDatabase {
    host: string,
    port: number,
    password: string,
}

interface IConfig {
    environment: string,
    server: IConfigService,
    database: IConfigDatabase,
    redisDatabase: IConfigRedisDatabase,
    randomSalt: string,
}

export {
    IConfigService,
    IConfigDatabase,
    IConfigRedisDatabase,
    IConfig,
};
