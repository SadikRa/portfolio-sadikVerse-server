import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
    liveLink: z
      .string()
      .url('Invalid live link URL')
      .min(1, 'Live link is required'),
    technologies: z
      .array(z.string())
      .min(1, 'Technologies must be an array of strings'),
  }),
});

export const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url('Invalid image URL').optional(),
    liveLink: z.string().url('Invalid live link URL').optional(),
    technologies: z.array(z.string()).optional(),
  }),
});
