import { getS3SignedUrl } from "@/actions/projectActions";
import { connectToDatabase } from "@/lib/connectDB";
import { Project } from "@/models/Projects.model";

import { NextResponse } from "next/server";

interface ProjectType {
  _id: string;
  name: string;
  description: string;
  techStack: string;
  duration: string;
  images: string[];
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const projects = await Project.find()
      .sort({ name: -1 })
      .lean<ProjectType[]>();

    // ✅ Ensure project.images[0] exists before fetching signed URL
    const projectWithUrls = await Promise.all(
      projects.map(async (project: ProjectType) => {
        const signedUrl =
          project.images?.length > 0
            ? await getS3SignedUrl(project.images[0])
            : null;
        const url = signedUrl?.url ?? "";

        return { ...project, images: url }; // ✅ Properly override images
      })
    );

    return NextResponse.json({
      ok: true,
      message: "Fetched Projects successful",
      projects: projectWithUrls,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: "Fetch Failed",
      status: 500,
    });
  }
}
