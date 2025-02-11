import express from 'express';
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

//post blog
router.post(
  '/blogs',
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog,
);

router.get('/blogs/:id', blogController.getBlogById);

//update blog
router.patch(
  '/blogs/:id',
  validateRequest(BlogValidation.updateBlogValidationSchema),
  blogController.updateBlog,
);

// delete blog
router.delete('/blogs/:id', blogController.deleteBlog);

// get all blog
router.get('/blogs', blogController.getAllBlogs);

export const blogRoutes = router;
