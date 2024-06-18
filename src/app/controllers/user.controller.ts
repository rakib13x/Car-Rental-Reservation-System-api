import httpStatus from 'http-status';
import { UserServices } from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { createUserValidationSchema } from '../validations/user.validation';

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  console.log(user);

  const validateUserData = createUserValidationSchema.parse(user);
  const result = await UserServices.createUserIntoDB(validateUserData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
