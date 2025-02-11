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
exports.projectService = void 0;
const http_status_codes_1 = require("http-status-codes");
const project_model_1 = require("./project.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Create a project
const createProjectIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.create(data);
    return result;
});
// Update a project
const updateProjectIntoDB = (projectID, data) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.ProjectModel.findById(projectID);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    const updatedProject = yield project_model_1.ProjectModel.findByIdAndUpdate(projectID, data, {
        new: true,
        runValidators: true,
    });
    if (!updatedProject) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update the project');
    }
    return updatedProject;
});
// Delete a project
const deleteProjectFromDB = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.ProjectModel.findById(projectId);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Project not found!');
    }
    yield project_model_1.ProjectModel.findByIdAndDelete(projectId);
    return { success: true };
});
// Get all projects
const getAllProjectsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.find();
    return result;
});
// Get a single project by ID
const getProjectByIdFromDB = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.ProjectModel.findById(projectId);
    return project;
});
exports.projectService = {
    createProjectIntoDB,
    updateProjectIntoDB,
    deleteProjectFromDB,
    getAllProjectsFromDB,
    getProjectByIdFromDB,
};
