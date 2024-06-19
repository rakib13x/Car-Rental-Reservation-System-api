import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AuthControllers } from '../../controllers/auth.controller';
import { AuthValidation } from '../../validations/auth.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
