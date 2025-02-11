import { Schema, model } from 'mongoose';
import { TProject } from './project.interface';



const projectSchema = new Schema<TProject>(
  {
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
  },
  {
    timestamps: true,
  },
);

export const ProjectModel = model<TProject>('Project', projectSchema);
