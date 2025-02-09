/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './User.Constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  isDeleted: boolean;
}

export interface UserModelInterface extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserPasswordMatch(TextPass: string, hasPass: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

export type TLoginUser = {
  email: string;
  password: string;
};
