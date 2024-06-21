import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TLoginUser } from '../interface/auth.interface';
import { User } from '../model/user.model';

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);

  const isUserExists = await User.isUserExistsByEmail(payload?.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist!');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  console.log(isPasswordMatched);

  return {};
};

export const AuthServices = {
  loginUser,
};
