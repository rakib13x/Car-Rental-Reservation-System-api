import httpStatus from 'http-status';
import { UserServices } from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { createUserValidationSchema } from '../validations/user.validation';

const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const validateUserData = createUserValidationSchema.parse(user);
  const result = await UserServices.createUserIntoDB(validateUserData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
