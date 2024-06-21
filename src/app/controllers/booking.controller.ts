/* eslint-disable prefer-const */
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
  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'User ID is missing from request.',
      data: null,
    });
  }

  const bookings = await BookingServices.getMyBookingsFromDb(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully!',
    data: bookings,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let filter: any = {
    isDeleted: false,
  };

  if (carId) {
    filter.car = carId as string;
  }

  if (date) {
    filter.date = new Date(date as string);
  }

  const bookings = await BookingServices.getAllBookings(filter);

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
  getAllBookings,
};
