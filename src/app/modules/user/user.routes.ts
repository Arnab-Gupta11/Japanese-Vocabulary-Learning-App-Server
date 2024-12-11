import { Router } from 'express';
import { userControllers } from './user.controller';
import { isAdmin } from '../auth/auth.middleware';

const router = Router();
router.post('/create-user', userControllers.createUser);
router.get('/', isAdmin, userControllers.getAllUser);
router.patch('/:id', isAdmin, userControllers.updateUser);

export const UserRoutes = router;
