/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from '../constants/user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone: number;
  address: string;
}

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
