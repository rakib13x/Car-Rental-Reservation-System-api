import express from 'express';
import { bookingControllers } from '../../controllers/booking.controller';

const router = express.Router();

router.post('/', bookingControllers.createBooking);

export const BookingRoutes = router;
