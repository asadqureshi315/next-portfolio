import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type tParams = Promise<{ slug: string[] }>;

export default async function ProjectDetailPage({
  params,
}: {
  params: tParams;
}) {
  const project = {
    id: 1,
    name: "E-Commerce Platform",
    slug: "e-commerce",
    description:
      "A full-featured online store with cart, checkout, and payment processing.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    duration: "2 Week",
    images: [
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  };

  if (!project) {
    notFound();
  }

  const slug = (await params).slug;

  return (
    <div className="container py-12 mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center mb-6 text-sm hover:text-primary transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Projects
      </Link>

      <h1 className="text-4xl font-bold mb-2">{slug}</h1>
      <p className="text-muted-foreground mb-6">{project.duration}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="mb-6">{project.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src={project.images[0] || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Project Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.images.map((image, index) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden group"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${project.name} image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
