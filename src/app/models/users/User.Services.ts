import { StatusCodes } from 'http-status-codes';
import { TLoginUser, TUser } from './User.Interface';
import { UserModel } from './User.Model';
import AppError from '../../errors/AppError';
import { createToken } from '../../../utils/auth.utils';
import config from '../../config';

const createUserIntoDB = async (user: TUser) => {
  // Check if user already exists
  const existingUser = await UserModel.findOne({ email: user.email });

  if (existingUser) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'A user with this email already exists.',
    );
  }

  // Create and return the new user
  return await UserModel.create(user);
};

const loginUser = async (payload: TLoginUser) => {
  // Check if the payload contains the required fields
  if (!payload?.email || !payload?.password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Email and password are required',
    );
  }

  // Check if the user exists
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Check if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted');
  }

  // Check if the user is blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
  }

  // Check if the password matches
  if (
    !(await UserModel.isUserPasswordMatch(payload?.password, user?.password))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  // create token sent

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // If everything is fine, return a success response or token
  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = { createUserIntoDB, loginUser };
