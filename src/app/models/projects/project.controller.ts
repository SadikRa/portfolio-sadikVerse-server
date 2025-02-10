import { StatusCodes } from "http-status-codes";
import { projectService } from "./project.service";

import AppError from "../../errors/AppError";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

// Create a project
const createProject = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await projectService.createProjectIntoDB(data);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

// Update a project
const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedProject = await projectService.updateProjectIntoDB(id, payload);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});

// Delete a project
const deleteProject = catchAsync(async (req, res) => {
  const { id: projectId } = req.params;

  await projectService.deleteProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project deleted successfully",
    data: null,
  });
});

// Get all projects
const getAllProjects = catchAsync(async (req, res) => {
  const result = await projectService.getAllProjectsFromDB();

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});

// Get a single project by ID
const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const project = await projectService.getProjectByIdFromDB(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found!");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Project retrieved successfully",
    data: project,
  });
});

export const projectController = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
};