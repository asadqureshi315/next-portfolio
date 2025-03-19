import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    subTitle: { type: String, trim: true },
    description: { type: String, trim: true },
    experience: [
      {
        at: { type: String, trim: true },
        description: { type: String, trim: true },
        duration: { type: String, trim: true },
      },
    ],
    resume: { type: String, trim: true },
    techNodes: {
      nodes: [
        {
          _id: false,
          id: { type: String, trim: true },
          category: { type: String, trim: true },
          description: { type: String, trim: true },
        },
      ],
      links: [
        {
          _id: false,
          source: { type: String, trim: true },
          target: { type: String, trim: true },
        },
      ],
    },
    radar: {
      fullstack: [
        {
          _id: false,
          category: { type: String, trim: true },
          value: { type: String, trim: true },
        },
      ],
      devops: [
        {
          _id: false,
          category: { type: String, trim: true },
          value: { type: String, trim: true },
        },
      ],
    },
    email: { type: String, trim: true },
    github: { type: String, trim: true },
    linkedIn: { type: String, trim: true },
    leetcode: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const About =
  mongoose.models.about || mongoose.model("about", aboutSchema);
