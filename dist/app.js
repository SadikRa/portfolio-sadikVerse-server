"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const User_Route_1 = require("./app/models/users/User.Route");
const blog_router_1 = require("./app/models/blog/blog.router");
const project_router_1 = require("./app/models/projects/project.router");
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
// Application routes
//users
app.use('/api/users', User_Route_1.UserRouters);
//blogs
app.use('/api', blog_router_1.blogRoutes);
//
app.use('/api', project_router_1.projectRoutes);
// Default route
app.get('/', (req, res) => {
    res.send('Hello Sadik !');
});
exports.default = app;
