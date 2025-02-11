"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    liveLink: {
        type: String,
        required: [true, 'Live link is required'],
    },
    technologies: {
        type: [String],
        required: [true, 'Technologies are required'],
    },
}, {
    timestamps: true,
});
exports.ProjectModel = (0, mongoose_1.model)('Project', projectSchema);
