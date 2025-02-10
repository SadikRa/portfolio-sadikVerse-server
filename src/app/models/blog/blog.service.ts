/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';

// Create blog
const createBlogIntoDB = async (data: IBlog) => {
  const result = await Blog.create(data);

  return result;
};

// Update blog
const updateBlogIntoDB = async (blogID: string, data: Partial<IBlog>) => {
  const blog = await Blog.findById(blogID);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogID, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update the blog',
    );
  }

  return updatedBlog;
};

// Delete a blog from the database
const deleteBlogFromDB = async (blogId: string) => {
  const blog = await Blog.findById(blogId).populate('author');

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  await Blog.findByIdAndDelete(blogId);

  return { success: true };
};

//get all blogs
const getAllBlogFromDB = async () => {
  const result = await Blog.find();
  return result;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
