import { Response, NextFunction } from 'express';
import * as md5 from 'md5';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';
import * as apiResponse from '@shared/services/response/apiResponse';

/*
selectCacheKey = route:queryKeys:auth:pagination:fixedQuery
*/

function cacheMiddleware() {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        if (req.endpoint.config.cache) {
            const { endpointCacheRedisConnection } = dbService.getRedisConnection();
            const route = req.baseUrl.replace('/api/v1/', '');
            
            let queryCacheKey = '';
            let authCacheKey = '';
            let paginationCacheKey = '';
            for (const queryKey of Object.keys(req.query)) {
                queryCacheKey += `${queryKey}=${req.query[queryKey]},`;
            }
            
            if (req.endpoint.config.auth) {
                for (const queryKey of Object.keys(req.endpoint.config.auth).sort()) {
                    authCacheKey += `${queryKey}=${req.query[queryKey]},`;
                }
            }
    
            if (req.pagination && req.pagination.limit && req.pagination.page) {
                paginationCacheKey = `limit:${req.pagination.limit},page:${req.pagination.page},`;
            }
            
            req.selectCacheKey = md5(`${route}:${queryCacheKey}:${authCacheKey}:${paginationCacheKey}`);
    
            const queryContent = await endpointCacheRedisConnection.getAsync(req.selectCacheKey);
    
            if (queryContent) {
                apiResponse.success(res, JSON.parse(queryContent));
            } else {
                next();
            }
        } else {
            next();
        }
    }
}

export {
    cacheMiddleware
};
