"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const project_validation_1 = require("./project.validation");
const router = express_1.default.Router();
// Create a project
router.post('/projects', (0, validateRequest_1.default)(project_validation_1.createProjectValidationSchema), project_controller_1.projectController.createProject);
// Get a project by ID
router.get('/projects/:id', project_controller_1.projectController.getProjectById);
// Update a project
router.patch('/projects/:id', (0, validateRequest_1.default)(project_validation_1.updateProjectValidationSchema), project_controller_1.projectController.updateProject);
// Delete a project
router.delete('/projects/:id', project_controller_1.projectController.deleteProject);
// Get all projects
router.get('/projects', project_controller_1.projectController.getAllProjects);
exports.projectRoutes = router;
