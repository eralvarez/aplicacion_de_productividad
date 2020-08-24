import * as joi from 'joi';
import { Response, NextFunction } from 'express';

import * as authModel from '@api/v1/user/auth/auth.model';
import { IRequest } from '@shared/interfaces/endpoint.interface';


function userMapMiddleware() {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        const validateTokenSchema = joi.object().keys({
            token: joi.string().required()
        });
        const validateToken = joi.validate(
            { token: String(req.headers['x-auth']) },
            validateTokenSchema,
            { stripUnknown: true }
        );

        req.isAuth = false;
        if (!validateToken.error) {
            const authToken = validateToken.value.token;
            const { user, foundToken } = await authModel.validateToken(authToken);

            req.isAuth = foundToken;
            req.token = authToken;
            if (req.isAuth) {
                req.user = user;
            }
        }

        next();
    }
}

export {
    userMapMiddleware
};
