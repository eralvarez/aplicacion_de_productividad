import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';

// TODO: migrate this and complete, this should be another single node that keeps checking 
// for endpoint.config.cache data and keeps updated redis cache
const endpointsInQueue = [];
function cacheAutoRefreshStrategy(req: IRequest, cacheExpirationInSeconds: number, sql: string) {
    if (!endpointsInQueue.includes(req.endpoint.id)) {
        setTimeout(async() => {
            const knexConnection =  dbService.getDbConnection();
            let endpoint = await knexConnection('system_endpoints').where({
                id : req.endpoint.id,
            }).select('*');
            endpoint = (endpoint.length) ? endpoint[0] : null;

        }, cacheExpirationInSeconds);
    }
}

export {
    cacheAutoRefreshStrategy,
}