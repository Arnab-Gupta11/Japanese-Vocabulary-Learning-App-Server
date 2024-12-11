import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { LessonRoutes } from '../modules/lesson/lesson.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/lessons',
    route: LessonRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
