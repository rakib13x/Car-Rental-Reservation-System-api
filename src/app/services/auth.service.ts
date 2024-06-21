import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TLoginUser } from '../interface/auth.interface';
import { User } from '../model/user.model';

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);

  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist!');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched.');
  }

  return {};
};

export const AuthServices = {
  loginUser,
};
