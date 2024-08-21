import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TLoginUser } from '../interface/auth.interface';
import { TUser } from '../interface/user.interface';
import { User } from '../model/user.model';

const loginUser = async (payload: TLoginUser) => {
  const user = (await User.isUserExistsByEmail(payload?.email)) as TUser & {
    _id: string;
  };
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist!');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match.');
  }

  const jwtPayload = {
    _id: user._id,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
