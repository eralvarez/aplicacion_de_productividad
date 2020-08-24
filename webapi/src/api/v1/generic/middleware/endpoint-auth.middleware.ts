import { Response, NextFunction } from 'express';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as apiResponse from '@shared/services/response/apiResponse';


function endpointAuthMiddleware() {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        if (req.endpoint.config.auth) {
            if (req.endpoint.config.auth.required && req.isAuth) {
                const verify = req.endpoint.config.auth.verify;
                const requiredUserType = req.endpoint.config.auth.userType;
                const requiredUserId = req.endpoint.config.auth.userId;

                if (verify === 'type') {
                    if (requiredUserType === req.user.type) {
                        next();
                    } else {
                        apiResponse.forbidden(res);
                    }
                } else if (verify === 'id') {
                    if (requiredUserId === req.user.id) {
                        next();
                    } else {
                        apiResponse.forbidden(res);
                    }
                } else if (verify === 'both') {
                    if (requiredUserType === req.user.type && requiredUserId === req.user.id) {
                        next();
                    } else {
                        apiResponse.forbidden(res);
                    }
                } else {
                    // verify = none
                    next();
                }
            } else {
                // user is not logged
                apiResponse.unauthorized(res);
            }
        } else {
            // public endpoint
            next();
        }
    }
}

export {
    endpointAuthMiddleware
};