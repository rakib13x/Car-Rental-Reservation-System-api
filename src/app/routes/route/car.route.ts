import express from 'express';
import { USER_ROLE } from '../../constants/user.constant';
import { CarControllers } from '../../controllers/car.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { updateBookingValidationSchema } from '../../validations/booking.validation';
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from '../../validations/car.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createCarValidationSchema),
  CarControllers.createCars,
);
router.get('/', auth(USER_ROLE.admin), CarControllers.getAllCars);
router.put(
  '/return',
  auth(USER_ROLE.admin),
  validateRequest(updateBookingValidationSchema),
  CarControllers.returnCar,
);
router.get('/:carId', CarControllers.getSingleCar);
router.put(
  '/:carId',
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarControllers.updateCar,
);
router.delete('/:carId', auth(USER_ROLE.admin), CarControllers.deleteCar);
export const CarRoutes = router;
