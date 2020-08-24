import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import * as authSchema from './auth.schemas';
import * as apiResponse from '@shared/services/response/apiResponse';
import * as authModel from './auth.model';


async function validateToken(req: Request, res: Response, next: NextFunction) {
    const formValidation = joi.validate(
        { token: req.params.token },
        authSchema.validateToken,
        { stripUnknown: true }
    );

    if (!formValidation.error) {
        const validateTokenResponse = {
            auth: false,
            user: null,
        };
        try {
            const { user, foundToken } = await authModel.validateToken(formValidation.value.token);
            
            if (foundToken) {
                validateTokenResponse.auth = true;
                validateTokenResponse.user = user;
            }

            apiResponse.success(res, validateTokenResponse);
        } catch (error) {
            console.error(error);
            apiResponse.success(res, validateTokenResponse);
        }
    } else {
        apiResponse.conflict(res);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    const formValidation = joi.validate(
        req.body,
        authSchema.validateCredentials,
        { stripUnknown: true }
    );

    if (!formValidation.error) {
        const authResponse = {
            auth: false,
            token: null,
        };

        try {
            const { token } = await authModel.validateCredentials(formValidation.value);

            if (token) {
                authResponse.auth = true;
                authResponse.token = token;
            }

            apiResponse.success(res, authResponse);
        } catch (error) {
            console.error(error);
            apiResponse.conflict(res, authResponse);
        }
    } else {
        apiResponse.conflict(res);
    }
}


export {
    validateToken,
    login,
};
