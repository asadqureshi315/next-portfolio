import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getProject } from "@/actions/projectActions";
import ImageLightbox from "@/components/project/image-lightbox";

type tParams = Promise<{ slug: string }>;

export default async function ProjectDetailPage({
  params,
}: {
  params: tParams;
}) {
  const slug = (await params).slug;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${slug}`,
    { method: "GET" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await response.json();
  const project = data.project;

  // const project = await getProject("slug", slug);
  if (!project) {
    notFound();
  }
  return (
    <div className="container !px-5 py-12 mx-auto">
      <Link
        href="/projects"
        prefetch={false}
        className="inline-flex items-center mb-6 text-sm hover:text-primary transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Projects
      </Link>

      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
        {project.name}
      </h1>
      <p className="text-muted-foreground text-sm lg:text-base mb-2">
        {project.at}
      </p>
      <p className="text-muted-foreground text-sm lg:text-base mb-6">
        {project.duration}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="mb-6 text-xs sm:text-sm lg:text-base">
            <ul className="list-disc pl-4 sm:pl-3 lg:pl-2 space-y-1">
              {project.description
                .split(">")
                .filter((txt: string) => txt.trim() !== "") // Remove empty items
                .map((txt: string, idx: number) => (
                  <li key={idx} className="leading-tight">
                    {txt.trim()}
                  </li> // Reduce spacing
                ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className=" text-sm sm:text-base lg:text-xl font-semibold mb-3">
              Technologies Used
            </h2>
            <div className=" text-sm sm:text-base lg:text-xl flex flex-wrap gap-2">
              {project.techStack.split(",").map((tech: any) => (
                <Badge key={tech} className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <ImageLightbox
            images={project.images}
            // src={project.images[0] || "/placeholder.svg"}
            alt={project.name}
            initialIndex={0}
            className="h-[300px]"
            imageClassName="hover:scale-105"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm sm:text-base lg:text-xl font-semibold mb-4">
          Project Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.images.map((image: string, index: number) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden group"
            >
              <ImageLightbox
                images={project.images}
                key={index}
                alt={`${project.name} image ${index + 1}`}
                initialIndex={index}
                className="h-48"
                imageClassName="group-hover:scale-110"
                showOverlay
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
