
// const router = require('express').Router();
import { Router } from 'express';
const router = Router();
// const authMiddleware = require('../../shared/middleware/auth/auth.middleware');
// const userCtrl = require('./user.controller');
// const authRoutes = require('./auth/auth.route');
import { authRoutes } from './auth/auth.route';

router.use('/auth', authRoutes);

// TODO: figure out the proper permission needed for this route
// router.get('/', authMiddleware({allowedTypes: ['user']}), userCtrl.getAll);
// router.post('/', userCtrl.register);
// router.get('/address', authMiddleware(), userAddressCtrl.getUserAddressList);
// router.post('/address', authMiddleware(), userAddressCtrl.createUserAddress);
// router.post('/request-recover-password', recoverPasswordCtrl.recoverPassword);
// router.post('/reset-password', recoverPasswordCtrl.resetPassword);
// router.put('/address/:userAddressId', authMiddleware(), userAddressCtrl.updateUserAddress);
// router.delete('/address/:userAddressId', authMiddleware(), userAddressCtrl.deleteUserAddress);
// router.get('/:id', userCtrl.getById);

export const userRoutes = router;