import { Response, NextFunction } from 'express';

import * as apiResponse from '@shared/services/response/apiResponse';
import { IRequest } from '@shared/interfaces/endpoint.interface';


function authMiddleware(allowedTypes = []) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        if (req.isAuth) {
            if (allowedTypes.length > 0) {
                if (allowedTypes.includes(req.user.type)) {
                    next();
                } else {
                    apiResponse.forbidden(res);
                }
            } else {
                next();
            }
        } else {
            apiResponse.unauthorized(res);
        }
    }
}

export {
    authMiddleware
};
