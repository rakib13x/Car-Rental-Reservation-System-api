import { Types } from 'mongoose';
import AppError from '../errors/AppError';
import { TBooking } from '../interface/booking.interface';
import { BookingModel } from '../model/booking.model';
import { CarModel } from '../model/car.model';

const createBookingIntoDB = async (
  bookingData: Partial<Omit<TBooking, 'endTime' | 'totalCost'>>,
  userId: string,
) => {
  if (
    !bookingData.date ||
    !userId ||
    !bookingData.car ||
    !bookingData.startTime
  ) {
    throw new AppError(
      400,
      'All required fields (date, user, car, startTime) must be provided',
    );
  }

  bookingData.date = new Date(bookingData.date);

  const existingBooking = await BookingModel.findOne({
    user: new Types.ObjectId(userId),
    endTime: null,
  });

  if (existingBooking) {
    throw new AppError(
      400,
      'User already has an ongoing booking without an end time',
    );
  }

  const car = await CarModel.findById(bookingData.car);
  if (!car || car.status !== 'available' || car.isDeleted) {
    throw new AppError(400, 'Car is not available for booking');
  }

  const bookingToCreate: Partial<TBooking> = {
    ...bookingData,
    user: new Types.ObjectId(userId),
    totalCost: 0,
    endTime: null,
  };

  const createdBooking = await BookingModel.create(bookingToCreate);

  const populatedBooking = await BookingModel.findById(createdBooking._id)
    .populate('user', '_id name email role phone address')
    .populate('car')
    .exec();

  await CarModel.findByIdAndUpdate(bookingData.car, {
    status: 'not available',
  });

  return populatedBooking;
};

const getMyBookingsFromDb = async (userId: string) => {
  const bookings = await BookingModel.find({
    user: userId,
  })
    .populate('user', '_id name email role phone address')
    .populate('car')
    .exec();

  return bookings;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllBookings = async (filter: any) => {
  const bookings = await BookingModel.find(filter)
    .populate('user', '_id name email role phone address')
    .populate('car')
    .exec();

  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getMyBookingsFromDb,
  getAllBookings,
};
