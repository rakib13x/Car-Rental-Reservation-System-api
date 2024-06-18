import httpStatus from 'http-status';
import { CarServices } from '../services/car.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { createCarValidationSchema } from '../validations/car.validation';

const createCars = catchAsync(async (req, res) => {
  const car = req.body;
  console.log(car);

  const validateCarData = createCarValidationSchema.parse(car);
  const result = await CarServices.createCarsIntoDB(validateCarData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car is created succesfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrieved successfully !',
    meta: result.meta,
    data: result.result,
  });
});
export const CarControllers = {
  createCars,
};
