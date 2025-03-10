"use client";
import { getProjects, getS3SignedUrl } from "@/actions/projectActions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string;
  duration: string;
  images: string[];
}

const projects = [
  {
    _id: "1",
    name: "Test Project",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
    techStack: "React, MongoDB, NextJs, Express, NodeJs",
    duration: "1 Week",
    images: [
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741225269957-a95096f3d118?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741174648069-4af442ef5238?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    _id: "2",
    name: "Test Project",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    techStack: "React, MongoDB, NextJs, Express, NodeJs",
    duration: "1 Week",
    images: [
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741225269957-a95096f3d118?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741174648069-4af442ef5238?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    _id: "3",
    name: "Test Project",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
    techStack: "React, MongoDB, NextJs, Express, NodeJs",
    duration: "1 Week",
    images: [
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741225269957-a95096f3d118?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741174648069-4af442ef5238?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    _id: "4",
    name: "Test Project",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
    techStack: "React, MongoDB, NextJs, Express, NodeJs",
    duration: "1 Week",
    images: [
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741225269957-a95096f3d118?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741174648069-4af442ef5238?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    _id: "5",
    name: "Test Project",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
    techStack: "React, MongoDB, NextJs, Express, NodeJs",
    duration: "1 Week",
    images: [
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741225269957-a95096f3d118?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1741174648069-4af442ef5238?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

export default function Projects() {
  // const [projects, setProjects] = useState<Project[]>([]);

  // useEffect(() => {
  //   async function fetchProjects() {
  //     const prj = await getProjects();

  //     const projectsWithUrls = await Promise.all(
  //       prj.map(async (project: Project) => {
  //         const signedUrls = await Promise.all(
  //           project.images.map(async (fileName) => {
  //             const response = await getS3SignedUrl(fileName);
  //             return response?.url ?? "";
  //           })
  //         );

  //         console.log("Signed URLs for project:", project.name, signedUrls);
  //         return { ...project, images: signedUrls };
  //       })
  //     );

  //     setProjects(projectsWithUrls);
  //   }
  //   fetchProjects();
  // }, []);

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      <div className="bg-gray-900 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
        <h2 className="text-white">Hover Me</h2>
      </div>
    </div>
  );
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [hovered, setHovered] = useState(false);
  const [randomPositions, setRandomPositions] = useState<
    { x: number; y: number; rotate: number }[]
  >([]);

  useEffect(() => {
    // Generate random positions **only on the client** after mounting
    setRandomPositions(
      project.images.map(() => ({
        x: (Math.random() - 0.5) * 25, // Random X scatter
        y: (Math.random() - 0.5) * 25, // Random Y scatter
        rotate: (Math.random() - 0.5) * 15, // Random tilt
      }))
    );
  }, [project.images.length]);

  return (
    <div
      key={project._id}
      className="border border-gray-800 rounded-xl shadow-lg p-4 w-full"
    >
      {/* Image Stack with Hover Effect */}
      <div
        className="relative w-60 h-60 overflow-visible rounded-xl shadow-lg cursor-pointer mx-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute inset-0 flex justify-center items-center p-3">
          {project.images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Project ${index}`}
              className="absolute w-60 h-48 object-cover rounded-xl shadow-lg"
              initial={{
                x: randomPositions[index]?.x || 0,
                y: randomPositions[index]?.y || 0,
                rotate: randomPositions[index]?.rotate || 0,
                scale: 1 - index * 0.05,
                opacity: 1,
              }}
              animate={{
                x: hovered ? index * 15 : randomPositions[index]?.x || 0,
                y: hovered ? index * 30 : randomPositions[index]?.y || 0,
                rotate: hovered
                  ? index % 2 === 0
                    ? 15
                    : -15
                  : randomPositions[index]?.rotate || 0,
                scale: hovered ? 1 - index * 0.02 : 1 - index * 0.05,
                opacity: 1,
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                zIndex: 50 - index,
              }}
            />
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-4 text-center">
        <h2 className="text-white text-lg font-bold">{project.name}</h2>
        <p className="text-gray-300 mt-1 truncate w-full">
          {project.description}
        </p>
        <p className="text-blue-400 mt-2 text-sm">
          Tech Stack: {project.techStack}
        </p>
      </div>
    </div>
  );
};
