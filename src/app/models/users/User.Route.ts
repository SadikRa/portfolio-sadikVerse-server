import express from 'express';
import { UserControllers } from './User.Controllers';
import { UserValidation } from './User.Validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/register',

  validateRequest(UserValidation.userValidationSchema),

  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);


router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken,
);

export const UserRouters = router;
