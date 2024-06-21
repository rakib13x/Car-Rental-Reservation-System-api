import express from 'express';
import { USER_ROLE } from '../../constants/user.constant';
import { UserControllers } from '../../controllers/user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);

export const UserRoutes = router;
