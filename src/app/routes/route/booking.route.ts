import express from 'express';
import { USER_ROLE } from '../../constants/user.constant';
import { bookingControllers } from '../../controllers/booking.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createBookingValidationSchema } from '../../validations/booking.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  bookingControllers.createBooking,
);
router.get('/', auth(USER_ROLE.admin), bookingControllers.getAllBookings);
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  bookingControllers.getMyBookings,
);
export const BookingRoutes = router;
