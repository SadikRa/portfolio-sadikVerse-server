"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectValidationSchema = exports.createProjectValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        image: zod_1.z.string().url('Invalid image URL').min(1, 'Image URL is required'),
        liveLink: zod_1.z
            .string()
            .url('Invalid live link URL')
            .min(1, 'Live link is required'),
        technologies: zod_1.z
            .array(zod_1.z.string())
            .min(1, 'Technologies must be an array of strings'),
    }),
});
exports.updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().url('Invalid image URL').optional(),
        liveLink: zod_1.z.string().url('Invalid live link URL').optional(),
        technologies: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
