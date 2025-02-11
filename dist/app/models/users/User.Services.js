"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const User_Model_1 = require("./User.Model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("../../../utils/auth.utils");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists
    const existingUser = yield User_Model_1.UserModel.findOne({ email: user.email });
    if (existingUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'A user with this email already exists.');
    }
    // Create and return the new user
    return yield User_Model_1.UserModel.create(user);
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the payload contains the required fields
    if (!(payload === null || payload === void 0 ? void 0 : payload.email) || !(payload === null || payload === void 0 ? void 0 : payload.password)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email and password are required');
    }
    // Check if the user exists
    const user = yield User_Model_1.UserModel.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    // Check if the user is deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted');
    }
    // Check if the user is blocked
    const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is blocked');
    }
    // Check if the password matches
    if (!(yield User_Model_1.UserModel.isUserPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid password');
    }
    // create token sent
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    // If everything is fine, return a success response or token
    return {
        accessToken,
        refreshToken,
    };
});
///refreshToken
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are UNAUTHORIZED');
    }
    //checking if the token valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    // Check if the user exists
    const user = yield User_Model_1.UserModel.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    // Check if the user is deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted');
    }
    // Check if the user is blocked
    const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is blocked');
    }
    const jwtPayload = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.UserService = { createUserIntoDB, loginUser, refreshToken };
