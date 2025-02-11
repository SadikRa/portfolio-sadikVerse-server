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
exports.projectController = void 0;
const http_status_codes_1 = require("http-status-codes");
const project_service_1 = require("./project.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
// Create a project
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield project_service_1.projectService.createProjectIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Project created successfully",
        data: result,
    });
}));
// Update a project
const updateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const updatedProject = yield project_service_1.projectService.updateProjectIntoDB(id, payload);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject,
    });
}));
// Delete a project
const deleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: projectId } = req.params;
    yield project_service_1.projectService.deleteProjectFromDB(projectId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Project deleted successfully",
        data: null,
    });
}));
// Get all projects
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.projectService.getAllProjectsFromDB();
    res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: result,
    });
}));
// Get a single project by ID
const getProjectById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield project_service_1.projectService.getProjectByIdFromDB(id);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Project not found!");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Project retrieved successfully",
        data: project,
    });
}));
exports.projectController = {
    createProject,
    updateProject,
    deleteProject,
    getAllProjects,
    getProjectById,
};
