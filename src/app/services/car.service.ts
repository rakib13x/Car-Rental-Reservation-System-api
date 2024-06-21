import AppError from '../errors/AppError';
import { TCar } from '../interface/car.interface';
import { BookingModel } from '../model/booking.model';
import { CarModel } from '../model/car.model';

const createCarsIntoDB = async (car: TCar) => {
  const result = await CarModel.create(car);
  return result;
};

const getAllCarsFromDb = async (regex?: RegExp) => {
  try {
    const result = regex
      ? await CarModel.find({ name: { $regex: regex } })
      : await CarModel.find();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

const getSingleCarFromDb = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

const updateCarInDb = async (id: string, updatedCar: Partial<TCar>) => {
  const result = await CarModel.findByIdAndUpdate(id, updatedCar, {
    new: true,
  });
  return result;
};

const deleteCarFromDb = async (id: string) => {
  const result = await CarModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const returnCarInDb = async (bookingId: string, endTime: string) => {
  const booking = await BookingModel.findById(bookingId)
    .populate('car')
    .populate('user');

  if (!booking) {
    throw new AppError(404, 'Booking not found');
  }

  if (!endTime) {
    throw new AppError(400, 'End time is required to return the car');
  }

  const startTime = parseFloat(booking.startTime.replace(':', '.'));
  const endTimeFloat = parseFloat(endTime.replace(':', '.'));
  const duration = endTimeFloat - startTime;

  if (isNaN(duration) || duration < 0) {
    throw new AppError(400, 'Invalid booking duration');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalCost = duration * (booking.car as any).pricePerHour;

  await CarModel.findByIdAndUpdate(
    booking.car._id,
    { status: 'available' },
    { new: true },
  );

  const updatedBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    { endTime, totalCost },
    { new: true },
  )
    .populate('car')
    .populate('user');

  return updatedBooking;
};
export const CarServices = {
  createCarsIntoDB,
  getAllCarsFromDb,
  getSingleCarFromDb,
  updateCarInDb,
  deleteCarFromDb,
  returnCarInDb,
};
