import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import { IsUser } from './auth.middleware';

const router = Router();
router.post('/login', AuthControllers.Login);
router.post('/logout', AuthControllers.Logout);
router.get('/check-user',IsUser,AuthControllers.CheckUser)

export const AuthRoutes = router;
