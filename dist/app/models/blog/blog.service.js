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
exports.blogService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const blog_model_1 = require("./blog.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Create blog
const createBlogIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(data);
    return result;
});
// Update blog
const updateBlogIntoDB = (blogID, data) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(blogID);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found!');
    }
    const updatedBlog = yield blog_model_1.Blog.findByIdAndUpdate(blogID, data, {
        new: true,
        runValidators: true,
    });
    if (!updatedBlog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update the blog');
    }
    return updatedBlog;
});
// Delete a blog from the database
const deleteBlogFromDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(blogId).populate('author');
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found!');
    }
    yield blog_model_1.Blog.findByIdAndDelete(blogId);
    return { success: true };
});
//get all blogs
const getAllBlogFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.find();
    return result;
});
exports.blogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogFromDB,
};
