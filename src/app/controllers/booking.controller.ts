import httpStatus from 'http-status';
import { BookingServices } from '../services/booking.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const bookings = await BookingServices.getMyBookingsFromDb(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully!',
    data: bookings,
  });
});

export const bookingControllers = {
  createBooking,
  getMyBookings,
};
