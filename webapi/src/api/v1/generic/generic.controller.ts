import { Request, Response, NextFunction } from 'express';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as apiResponse from '@shared/services/response/apiResponse';
import * as selectService from './services/select.service';
import * as createService from './services/create.service';
import * as updateService from './services/update.service';
import * as deleteService from './services/delete.service';


async function handleGet(req: IRequest, res: Response, next: NextFunction) {
    try {
        let queryResponse = await selectService.mainSelect(req);
        
        if (req.endpoint.config.singleObjectResponse) {
            queryResponse = queryResponse[0] || null;
        }
    
        apiResponse.success(res, queryResponse);
    } catch (error) {
        console.error(error);
        apiResponse.conflict(res);
    }
}

async function handlePost(req: IRequest, res: Response, next: NextFunction) {
    try {
        const response = await createService.create(req);

        apiResponse.created(res, response);
    } catch (error) {
        console.error(error);
        apiResponse.conflict(res);
    }
}

async function handlePut(req: IRequest, res: Response, next: NextFunction) {
    try {
        await updateService.update(req);
        apiResponse.successUpdate(res);
    } catch (error) {
        console.error(error);
        apiResponse.conflict(res);
    }
}

async function handleDelete(req: IRequest, res: Response, next: NextFunction) {
    try {
        await deleteService.remove(req);
        apiResponse.successDelete(res);
    } catch (error) {
        console.error(error);
        apiResponse.conflict(res);
    }
}

export {
    handleGet,
    handlePost,
    handlePut,
    handleDelete,
};
