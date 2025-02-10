import express from 'express';
import { projectController } from './project.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createProjectValidationSchema,
  updateProjectValidationSchema,
} from './project.validation';

const router = express.Router();

// Create a project
router.post(
  '/projects',
  validateRequest(createProjectValidationSchema),
  projectController.createProject,
);

// Get a project by ID
router.get('/projects/:id', projectController.getProjectById);

// Update a project
router.patch(
  '/projects/:id',
  validateRequest(updateProjectValidationSchema),
  projectController.updateProject,
);

// Delete a project
router.delete('/projects/:id', projectController.deleteProject);

// Get all projects
router.get('/projects', projectController.getAllProjects);

export const projectRoutes = router;
