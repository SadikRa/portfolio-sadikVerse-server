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
exports.blogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const blog_service_1 = require("./blog.service");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = require("./blog.model");
//create blog
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield blog_service_1.blogService.createBlogIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
}));
//update blog
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const updatedBlog = yield blog_service_1.blogService.updateBlogIntoDB(id, payload);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Blog updated successfully',
        data: updatedBlog,
    });
}));
//delete blog
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: blogId } = req.params;
    yield blog_service_1.blogService.deleteBlogFromDB(blogId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
}));
//get all data blog
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.getAllBlogFromDB();
    res.status(200).json({
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
}));
const getBlogById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found!');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Blog retrieved successfully',
        data: blog,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
};
