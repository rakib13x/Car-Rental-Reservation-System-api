import express from 'express';
import { UserControllers } from '../../controllers/user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

export const UserRoutes = router;
