import { Response, NextFunction } from 'express';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';
import * as apiResponse from '@shared/services/response/apiResponse';


function endpointWithUrlParamMiddleware() {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        const route = req.baseUrl.replace('/api/v1/', '');
        const knexConnection = dbService.getDbConnection();

        let endpoint = await knexConnection('system_endpoints').where({
            route: route.substr(0, route.lastIndexOf('/')),
            method: req.method.toUpperCase(),
        }).select('*');
        endpoint = (endpoint.length) ? endpoint[0] : null;

        if (endpoint !== null) {
            req.endpoint = endpoint;
            let queryUrlParam = route.substring(route.lastIndexOf('/') + 1);

            if (req.endpoint.config.queryUrlParamConfig.paramType === 'string') {
                req.queryUrlParam = queryUrlParam;
            } else if (req.endpoint.config.queryUrlParamConfig.paramType === 'number') {
                req.queryUrlParam = Number(queryUrlParam);
            }

            if (req.queryUrlParam !== null || req.queryUrlParam !== undefined) {
                next();
            } else {
                apiResponse.conflict(res);
            }
        } else {
            apiResponse.notFound(res);
        }
    }
}

export {
    endpointWithUrlParamMiddleware
}