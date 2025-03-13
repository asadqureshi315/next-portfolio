import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    at: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    techStack: { type: String, trim: true, required: true },
    duration: { type: String, trim: true, required: true },
    icon: { type: String, trim: true },
    github: { type: String, trim: true },
    live: { type: String, trim: true },
    images: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
