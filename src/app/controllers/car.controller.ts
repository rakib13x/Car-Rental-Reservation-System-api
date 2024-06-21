import httpStatus from 'http-status';
import { CarServices } from '../services/car.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { createCarValidationSchema } from '../validations/car.validation';

const createCars = catchAsync(async (req, res) => {
  const car = req.body;

  const validateCarData = createCarValidationSchema.parse(car);
  const result = await CarServices.createCarsIntoDB(validateCarData);

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

export const CarControllers = {
  createCars,
  getAllCars,
  getSingleCar,
  updateCar,
};
