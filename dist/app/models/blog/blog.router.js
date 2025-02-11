"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
//post blog
router.post('/blogs', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.blogValidationSchema), blog_controller_1.blogController.createBlog);
router.get('/blogs/:id', blog_controller_1.blogController.getBlogById);
//update blog
router.patch('/blogs/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogValidationSchema), blog_controller_1.blogController.updateBlog);
// delete blog
router.delete('/blogs/:id', blog_controller_1.blogController.deleteBlog);
// get all blog
router.get('/blogs', blog_controller_1.blogController.getAllBlogs);
exports.blogRoutes = router;
