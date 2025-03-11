"use server";

import { connectToDatabase } from "@/lib/connectDB";
import { Project } from "@/models/Projects.model";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

export const saveProject = async (formData: {
  name: string;
  slug: string;
  description: string;
  techStack: string;
  duration: string;
  images: string[];
}) => {
  await connectToDatabase();

  const { name, slug, description, techStack, duration, images } = formData;

  const newProject = await Project.create({
    name,
    slug,
    description,
    techStack,
    duration,
    images,
  });

  return JSON.stringify(newProject);
};

export const getProject = async (field: string, value: string) => {
  try {
    await connectToDatabase();

    const project = await Project.findOne({ [field]: value });
    let signedUrls: string[] = [];
    await Promise.all(
      project.images.map(async (img: string) => {
        const signedUrl = await getS3SignedUrl(img);
        const url = signedUrl?.url ?? "";

        signedUrls.push(url);
      })
    );
    project.images = signedUrls;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProjects = async () => {
  try {
    await connectToDatabase();

    const projects = await Project.find().sort({ name: -1 });
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProject = async (formData: {
  _id: string;
  name: string;
  slug: string;
  description: string;
  techStack: string;
  duration: string;
  images: string[];
}) => {
  await connectToDatabase();

  const { _id, name, slug, description, techStack, duration, images } =
    formData;

  const updatedProject = await Project.findByIdAndUpdate(_id, {
    name,
    slug,
    description,
    techStack,
    duration,
    images,
  });
  return JSON.stringify(updatedProject);
};

export const deleteProject = async (id: string) => {
  try {
    const deleted = await Project.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const s3Upload = async (file: File) => {
  try {
    if (!file) throw new Error("No file provided");

    const fileType = file.type;
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
      Conditions: [
        ["content-length-range", 0, 10 * 1024 * 1024 * 1024],
        ["starts-with", "$Content-Type", fileType],
      ],
      Fields: {
        // acl: "public-read",
        "Content-Type": fileType,
      },
    });
    return { url, fields, fileName };
  } catch (error) {
    console.error("Error generating S3 presigned URL:", error);
    return { error: "Failed to generate S3 URL" };
  }
};

export const getS3SignedUrl = async (fileName: string) => {
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 60 * 24,
    });
    return { url: signedUrl };
  } catch (error) {
    console.log(error);
  }
};

export const s3Delete = async (fileName: string) => {
  try {
    if (!fileName) throw new Error("No file name provided");

    const s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
    });

    await s3.send(command);
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting S3 file:", error);
    return { error: "Failed to delete file from S3" };
  }
};
