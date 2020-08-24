import * as knexnest from 'knexnest';
import * as dbService from '@shared/services/db/db.service';
import * as randomService from '@shared/services/random/random.service';

import { IRequest } from '@shared/interfaces/endpoint.interface';


let resetAttributeBase = false;
function createSqlSelectConfig(sqlConfig, endpointConfig, isRoot, attributeBase?, baseTable?) {
    if (isRoot) {
        attributeBase = '_';
    } else {
        sqlConfig.leftOuterJoin.push([
            `${endpointConfig.table} AS ${endpointConfig.alias || endpointConfig.property || endpointConfig.table}`,
            `${endpointConfig.alias || endpointConfig.property || endpointConfig.table}.${endpointConfig.reference}`,
            `${baseTable}.${endpointConfig.parentReference}`
        ]);
    }

    for (let attributeIndex = 0; attributeIndex < endpointConfig.attributes.length; attributeIndex++) {
        const attribute = endpointConfig.attributes[attributeIndex];
        const attributeAlias = endpointConfig.attributeAliases[attributeIndex];
        sqlConfig.select.push(`${endpointConfig.alias || endpointConfig.property || endpointConfig.table}.${attribute} AS ${attributeBase}${attributeAlias || attribute}`);
    }

    if (endpointConfig.join && endpointConfig.join.length) {
        for (const newEndpointConfig of endpointConfig.join) {
            if (resetAttributeBase) {
                attributeBase = `_${newEndpointConfig.alias || newEndpointConfig.property || newEndpointConfig.table}_`;
            } else {
                attributeBase = `${attributeBase}${newEndpointConfig.alias || newEndpointConfig.property || newEndpointConfig.table}_`;
            }

            if (newEndpointConfig.oneTo === 'many') {
                attributeBase += '_';
            }

            resetAttributeBase = false;
            createSqlSelectConfig(sqlConfig, newEndpointConfig, false, attributeBase, endpointConfig.alias || endpointConfig.property || endpointConfig.table);
        }
    } else {
        resetAttributeBase = true;
    }
}

async function mainSelect(req: IRequest) {
    const knex = dbService.getDbConnection();

    const sqlConfig = {
        select: [],
        from: '',
        leftOuterJoin: [],
    };

    idizeConfig(req.endpoint.config);
    sqlConfig.from = `${req.endpoint.config.table} AS ${req.endpoint.config.alias || req.endpoint.config.table}`;

    createSqlSelectConfig(sqlConfig, req.endpoint.config, true);

    let sql = knex.select(sqlConfig.select);
    sql = sql.from(sqlConfig.from);

    for (const leftJoin of sqlConfig.leftOuterJoin) {
        sql = sql.leftOuterJoin(leftJoin[0], leftJoin[1], leftJoin[2]);
    }

    console.log(sqlConfig);

    sql = sql.where((builder) => {

        const requestQueryKeys = Object.keys(req.query).filter(
            (queryKey) => Object.keys((req.endpoint.config.query) ? req.endpoint.config.query : {}).includes(queryKey)
        );

        for (let queryKeyIndex = 0; queryKeyIndex < requestQueryKeys.length; queryKeyIndex++) {
            const queryKey = requestQueryKeys[queryKeyIndex];
            const queryConfig = req.endpoint.config.query[queryKey];

            if (queryConfig) {
                const realColumn = queryConfig.aliasFor || queryKey;

                let textQuery = req.query[queryKey];
                if (queryConfig.operation.toLowerCase() === 'like') {
                    textQuery = `${queryConfig.likeWildcard.start}${textQuery}${queryConfig.likeWildcard.end}`;
                }

                if (queryKeyIndex === 0) {
                    builder.where(`${req.endpoint.config.alias}.${realColumn}`, queryConfig.operation, textQuery);
                } else {
                    builder.andWhere(`${req.endpoint.config.alias}.${realColumn}`, queryConfig.operation, textQuery);
                }
            }
        }
    });


    if (req.endpoint.config.fixedQuery) {
        sql = sql.where((builder) => {
            let textQuery = req.endpoint.config.fixedQuery.compareTo;

            console.log(req.endpoint.config.fixedQuery);

            if (req.endpoint.config.fixedQuery.compareTo.includes('$user')) {
                const userProperty = req.endpoint.config.fixedQuery.compareTo.split('.')[1];
                textQuery = req.user[userProperty];
            }

            builder.where(
                `${req.endpoint.config.fixedQuery.tableProperty}`,
                req.endpoint.config.fixedQuery.operation,
                textQuery,
            );
        });
    }

    if (req.endpoint.config.orderBy) {
        req.endpoint.config.orderBy = req.endpoint.config.orderBy.map((_orderBy) => {
            _orderBy.column = `${req.endpoint.config.alias || req.endpoint.config.table}.${_orderBy.column}`;
            return _orderBy;
        });
        sql = sql.orderBy(req.endpoint.config.orderBy || []);
    }

    if (req.endpoint.config.pagination) {
        sql = sql.offset(req.pagination.page * req.pagination.limit - req.pagination.limit)
        sql = sql.limit(req.pagination.limit);
    }

    let response = '';
    try {
        console.log(sql.toString());
        response = await knexnest(sql);

        deIdizeQueryResult(response);

        if (req.endpoint.config.cache) {
            const { endpointCacheRedisConnection } = dbService.getRedisConnection();
            const expirationTime = req.endpoint.config.cache.expirationTime;
            const cacheExpirationInSeconds = expirationTime.seconds +
                (expirationTime.minutes * 60) +
                (expirationTime.hours * 3600) +
                (expirationTime.days * 86400);
            endpointCacheRedisConnection.set(req.selectCacheKey, JSON.stringify(response), 'EX', cacheExpirationInSeconds);
        }
    } catch (error) { }

    return response;
}

const idMap = {};
function idizeConfig(config) {
    config.attributeAliases = config.attributeAliases || [];

    const table = config.property || config.table;
    // TODO: verify to get unique ID that are not used before in isMap
    config.alias = randomService.randomString(3);
    idMap[config.alias] = table;

    for (let attributeIndex = 0; attributeIndex < config.attributes.length; attributeIndex++) {
        const attribute = config.attributes[attributeIndex];
        let attributeAlias = attribute;
        // TODO: verify to get unique ID that are not used before in isMap
        attributeAlias = randomService.randomString(3);
        idMap[attributeAlias] = attribute;

        config.attributeAliases.push(attributeAlias);
    }

    if (config.join) {
        for (let joinIndex = 0; joinIndex < config.join.length; joinIndex++) {
            const newConfig = config.join[joinIndex];
            idizeConfig(newConfig);
        }
    }
}

function deIdizeQueryResult(queryResult) {
    if (Array.isArray(queryResult)) {
        for (const result of queryResult) {
            for (const idAttribute of Object.keys(result)) {
                const realAttribute = idMap[idAttribute];
                result[realAttribute] = result[idAttribute];
                delete result[idAttribute];

                deIdizeQueryResult(result[realAttribute]);
            }
        }
    } else if (queryResult === Object(queryResult)) {
        for (const idAttribute of Object.keys(queryResult)) {
            const realAttribute = idMap[idAttribute];

            if (realAttribute) {
                const value = queryResult[idAttribute];
                queryResult[realAttribute] = value;
                delete queryResult[idAttribute];

                deIdizeQueryResult(queryResult[realAttribute]);
            }

        }
    }
}

export {
    mainSelect,
};
