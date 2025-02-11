"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(5, { message: 'Title must be at least 5 characters long.' })
            .max(100, { message: 'Title cannot exceed 100 characters.' }),
        thumbnails: zod_1.z.string().url('Invalid thumbnail URL'),
        content: zod_1.z
            .string()
            .min(20, { message: 'Content must be at least 20 characters long.' }),
        isPublished: zod_1.z.boolean().default(false),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(5, { message: 'Title must be at least 5 characters long.' })
            .max(100, { message: 'Title cannot exceed 100 characters.' })
            .optional(), // Optional to allow partial updates
        content: zod_1.z
            .string()
            .min(20, { message: 'Content must be at least 20 characters long.' })
            .optional(), // Optional to allow partial updates
    }),
});
exports.BlogValidation = {
    blogValidationSchema,
    updateBlogValidationSchema,
};
