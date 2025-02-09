import express from 'express';
import { UserControllers } from './User.Controllers';
import { UserValidation } from './User.Validation';
import { USER_ROLE } from './User.Constant';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',

  validateRequest(UserValidation.userValidationSchema),

  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);

export const UserRouters = router;
