import { Router } from 'express';
import { UserRoutes } from './route/user.route';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
