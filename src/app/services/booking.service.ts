// src/services/booking.service.ts
import { TBooking } from '../interface/booking.interface';
import { BookingModel } from '../model/booking.model';

const createBookingIntoDB = async (bookingData: TBooking) => {
  const createdBooking = await BookingModel.create(bookingData);

  const populatedBooking = await BookingModel.findById(createdBooking._id)
    .populate('user')
    .populate('car')
    .exec();

  return populatedBooking;
};

const getMyBookingsFromDb = async (userId: string) => {
  const bookings = await BookingModel.find({ user: userId, isDeleted: false })
    .populate('car')
    .exec();
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getMyBookingsFromDb,
};
