import { Router } from 'express';
const router = Router();

import * as authCtrl from './auth.controller';

router.get('/:token?', authCtrl.validateToken);
router.post('/', authCtrl.login);

export const authRoutes = router;
