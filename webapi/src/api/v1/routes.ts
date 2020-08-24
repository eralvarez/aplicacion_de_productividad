import { Router } from 'express';

import { queryMiddleware } from '@shared/middleware/query.middleware';
import { healthCheckRoutes } from './health-check/health-check.route';
import { userRoutes } from './user/user.route';
import { genericRoutes } from './generic/generic.route';
import { userMapMiddleware } from '@shared/middleware/user-map.middleware';

const router = Router();

router.use(queryMiddleware());
// router.use(userMapMiddleware());

router.use('/health-check', healthCheckRoutes);
// router.use('/user', userRoutes);
router.use('/*', genericRoutes);

export const routes = router;
