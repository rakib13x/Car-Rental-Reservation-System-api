import { Router } from 'express';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes: any[] = [];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
