import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    techStack: { type: String, trim: true, required: true },
    duration: { type: String, trim: true, required: true },
    images: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
