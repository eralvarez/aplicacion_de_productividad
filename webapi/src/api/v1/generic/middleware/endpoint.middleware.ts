import { Response, NextFunction } from 'express';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';
import * as apiResponse from '@shared/services/response/apiResponse';


function endpointMiddleware() {
    
    return async (req: IRequest, res: Response, next: NextFunction) => {
        const route = req.baseUrl.replace('/api/v1/', '');
        const knexConnection = dbService.getDbConnection();

        let endpoint = await knexConnection('system_endpoints').where({
            route,
            method: req.method.toUpperCase(),
        }).select('*');
        endpoint = (endpoint.length) ? endpoint[0] : null;

        if (endpoint !== null) {
            req.endpoint = endpoint;

            if (req.endpoint.config.pagination) {
                const page: number = Number(req.query[req.endpoint.config.pagination.pageQueryAlias]) || 1;
                const limit: number = Number(req.query[req.endpoint.config.pagination.limitQueryAlias]) || Number(req.endpoint.config.pagination.defaultItemsPerPage);
                delete req.query[req.endpoint.config.pagination.pageQueryAlias];
                delete req.query[req.endpoint.config.pagination.limitQueryAlias];

                req.pagination = {
                    page,
                    limit,
                };
            } else {
                req.pagination = {};
            }

            next();
        } else {
            apiResponse.notFound(res);
        }
    }
}

export {
    endpointMiddleware
}