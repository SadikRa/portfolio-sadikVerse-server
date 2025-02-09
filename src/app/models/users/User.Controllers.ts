import { StatusCodes } from 'http-status-codes';

import { UserService } from './User.Services';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login in success',
    data: {
      accessToken,
    },
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
