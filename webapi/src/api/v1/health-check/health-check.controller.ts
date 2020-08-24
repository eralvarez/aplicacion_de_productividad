import { Request, Response, NextFunction } from 'express';

import * as apiResponse from '@shared/services/response/apiResponse';
import { config } from '@env/config';


async function doHealthCheck(req: Request, res: Response, next: NextFunction) {
    let responseMessage = {
        status: true,
        message: 'webapi running',
        environment: config.environment,
    };

    apiResponse.success(res, responseMessage);
}

export {
    doHealthCheck
};
