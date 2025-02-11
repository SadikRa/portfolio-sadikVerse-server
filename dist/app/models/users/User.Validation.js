"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().nonempty({ message: 'Name is required.' }),
        email: zod_1.z
            .string()
            .email({ message: 'Please provide a valid email address' })
            .nonempty({ message: 'Email cannot be empty' }),
        image: zod_1.z.string().trim().nonempty({ message: 'image is required.' }),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
        role: zod_1.z.enum(['user', 'admin']).default('user').optional(),
        isBlocked: zod_1.z.boolean().default(false).optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: 'Please provide a valid email address' }),
        password: zod_1.z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema,
};
