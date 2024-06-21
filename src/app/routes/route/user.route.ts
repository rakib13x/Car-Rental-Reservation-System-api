import express from 'express';
import { UserControllers } from '../../controllers/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../../validations/user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
