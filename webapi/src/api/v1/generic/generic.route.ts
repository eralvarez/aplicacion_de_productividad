import { Router } from 'express';

import { endpointMiddleware } from './middleware/endpoint.middleware';
import { endpointAuthMiddleware } from './middleware/endpoint-auth.middleware';
import { cacheMiddleware } from './middleware/cache.middleware';
import { endpointWithUrlParamMiddleware } from './middleware/endpoint-with-url-param.middleware';
import * as genericCtrl from './generic.controller';


const router = Router();

router.get(
    '/',
    [
        endpointMiddleware(),
        endpointAuthMiddleware(),
        cacheMiddleware(),
    ],
    genericCtrl.handleGet
);
router.post(
    '/',
    [
        endpointMiddleware(),
        endpointAuthMiddleware(),
        cacheMiddleware(),
    ],
    genericCtrl.handlePost
);
router.put(
    '/',
    [
        endpointWithUrlParamMiddleware(),
        endpointAuthMiddleware(),
    ],
    genericCtrl.handlePut
);
router.delete(
    '/',
    [
        endpointWithUrlParamMiddleware(),
        endpointAuthMiddleware(),
    ],
    genericCtrl.handleDelete
);

export const genericRoutes = router;