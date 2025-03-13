import { getS3SignedUrl } from "@/actions/projectActions";
import { connectToDatabase } from "@/lib/connectDB";
import { Project } from "@/models/Projects.model";

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    await connectToDatabase();
    const singlePrj = await Project.findOne({ slug: slug }).lean<Project>();
    const projectSignedImages = singlePrj?.images
      ? await Promise.all(
          singlePrj.images.map(async (img: string) => {
            return getS3SignedUrl(img); // No need for extra `await` inside `.map()`
          })
        )
      : [];

    if (singlePrj) {
      singlePrj.images = (projectSignedImages ?? []).map(
        (itm) => itm?.url ?? ""
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Fetched Project successful",
      project: singlePrj,
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
