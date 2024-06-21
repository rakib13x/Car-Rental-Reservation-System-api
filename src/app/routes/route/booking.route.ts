import express from 'express';
import { USER_ROLE } from '../../constants/user.constant';
import { bookingControllers } from '../../controllers/booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', bookingControllers.createBooking);
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  bookingControllers.getMyBookings,
);
export const BookingRoutes = router;
