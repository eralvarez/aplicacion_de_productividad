import { Router } from 'express';

import * as healthCheckCtrl from './health-check.controller';

const router = Router();
router.get('/', healthCheckCtrl.doHealthCheck);

export const healthCheckRoutes = router;