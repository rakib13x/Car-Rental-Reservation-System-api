import express from 'express';
import { UserControllers } from '../../controllers/user.controller';

const router = express.Router();

router.post('/user-registration', UserControllers.createUser);

export const UserRoutes = router;
