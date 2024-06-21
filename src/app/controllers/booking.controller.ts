/* eslint-disable prefer-const */
import httpStatus from 'http-status';
import { BookingServices } from '../services/booking.service';
import catchAsync from '../utils/catchAsync';
import { isValidDate } from '../utils/isValidDate';
import { isValidObjectId } from '../utils/isValidObjectId';
import sendResponse from '../utils/sendResponse';

const createBooking = catchAsync(async (req, res) => {
  const { endTime, totalCost, ...bookingData } = req.body;

  if (endTime || totalCost) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'You cannot set endTime or totalCost when creating a booking.',
      data: null,
    });
  }

  const result = await BookingServices.createBookingIntoDB(bookingData);

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
  let filter: any = {};

  if (carId && isValidObjectId(carId as string)) {
    filter.car = carId as string;
  }

  if (date && isValidDate(date as string)) {
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
