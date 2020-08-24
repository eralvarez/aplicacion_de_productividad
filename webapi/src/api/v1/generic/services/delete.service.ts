import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';


async function remove(req: IRequest) {
    let dbConnection = dbService.getDbConnection();

    const deleteResponse = await dbConnection(req.endpoint.config.table).del().where((builder) => {
        const textQuery = req.queryUrlParam;

        builder.where(
            req.endpoint.config.queryUrlParamConfig.tableProperty,
            req.endpoint.config.queryUrlParamConfig.operation,
            textQuery,
        );

        if (req.endpoint.config.fixedQuery) {
            if (req.isAuth && req.endpoint.config.fixedQuery.compareTo.includes('$user')) {
                const userProperty = req.endpoint.config.fixedQuery.compareTo.split('.')[1];

                builder.where(
                    req.endpoint.config.fixedQuery.tableProperty,
                    req.endpoint.config.fixedQuery.operation,
                    req.user[userProperty],
                );
            } else {
                builder.where(
                    req.endpoint.config.fixedQuery.tableProperty,
                    req.endpoint.config.fixedQuery.operation,
                    req.endpoint.config.fixedQuery.compareTo,
                );
            }
        }
    });

    if (deleteResponse) {
        return deleteResponse;
    } else {
        throw new Error('item not deleted');
    }
}

export {
    remove,
};
