"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require("express"));
const User_Controllers_1 = require("./User.Controllers");
const User_Validation_1 = require("./User.Validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(User_Validation_1.UserValidation.userValidationSchema), User_Controllers_1.UserControllers.createUser);
router.post('/login', (0, validateRequest_1.default)(User_Validation_1.UserValidation.loginValidationSchema), User_Controllers_1.UserControllers.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(User_Validation_1.UserValidation.refreshTokenValidationSchema), User_Controllers_1.UserControllers.refreshToken);
exports.UserRouters = router;
