import { StatusCodes } from 'http-status-codes';
import { ProjectModel } from './project.model';
import AppError from '../../errors/AppError';
import { TProject } from './project.interface';

// Create a project
const createProjectIntoDB = async (data: TProject) => {
  const result = await ProjectModel.create(data);
  return result;
};

// Update a project
const updateProjectIntoDB = async (
  projectID: string,
  data: Partial<TProject>,
) => {
  const project = await ProjectModel.findById(projectID);
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!');
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(projectID, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update the project',
    );
  }

  return updatedProject;
};

// Delete a project
const deleteProjectFromDB = async (projectId: string) => {
  const project = await ProjectModel.findById(projectId);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!');
  }

  await ProjectModel.findByIdAndDelete(projectId);

  return { success: true };
};

// Get all projects
const getAllProjectsFromDB = async () => {
  const result = await ProjectModel.find();
  return result;
};

// Get a single project by ID
const getProjectByIdFromDB = async (projectId: string) => {
  const project = await ProjectModel.findById(projectId);
  return project;
};

export const projectService = {
  createProjectIntoDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
};
