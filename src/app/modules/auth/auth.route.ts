import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();
router.post('/login', AuthControllers.Login);
router.post('/logout', AuthControllers.Logout);

export const AuthRoutes = router;
