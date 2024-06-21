import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { CarServices } from '../services/car.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createCars = catchAsync(async (req, res) => {
  const result = await CarServices.createCarsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is created succesfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const { name } = req.query;
  const regex = name ? new RegExp(name as string, 'i') : undefined;
  const cars = await CarServices.getAllCarsFromDb(regex);

  if (cars.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'All Cars is retrieved successfully !',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Cars is retrieved successfully !',
    data: cars,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.getSingleCarFromDb(carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is retrieved successfully!',
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const updatedCar = req.body;
  const result = await CarServices.updateCarInDb(carId, updatedCar);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found!',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully!',
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const { carId } = req.params;
  const result = await CarServices.deleteCarFromDb(carId);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Car not found!',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car deleted successfully!',
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid Booking ID',
      data: null,
    });
  }

  try {
    const result = await CarServices.returnCarInDb(bookingId, endTime);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car returned successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

export const CarControllers = {
  createCars,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
};
