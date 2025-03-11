"use client";

import type React from "react";

import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Code,
  ExternalLink,
  Github,
  Layers,
  Monitor,
  Palette,
} from "lucide-react";
import { getProjects, getS3SignedUrl } from "@/actions/projectActions";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

interface ProjectProps {
  index: number;
  _id: number;
  name: string;
  slug: string;
  description: string;
  techStack: string;
  icon: React.ReactNode;
  images: string;
}

function Project({
  index,
  _id,
  name,
  slug,
  description,
  techStack,
  icon,
  images,
}: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="project-container">
      <div ref={ref} className="project-card">
        <div className="project-image-container">
          <img
            src={images || "/placeholder.svg"}
            alt={name}
            className="project-image"
          />
        </div>
        <div className="project-content">
          <div className="project-header">
            <a
              href={`/projects/${slug}`}
              className="project-title hover:underline"
            >
              {name}
            </a>
          </div>
          <p className="project-description truncate w-[ch_100]">
            {description}
          </p>
          <div className="project-techStack">
            {techStack.split(",").map((tech, index) => (
              <span key={index} className="project-tech-tag">
                {tech}
              </span>
            ))}
          </div>
          <div className="project-links">
            <a href="#" className="project-link">
              <Github size={16} />
              <span>View Code</span>
            </a>
            <a href="#" className="project-link">
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className="project-number"
      >{`#${index.toString().padStart(2, "0")}`}</motion.h2>
    </section>
  );
}

// const projects: ProjectProps[] = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     description:
//       "A full-featured online store with cart, checkout, and payment processing.",
//     techStack: ["React", "Node.js", "MongoDB", "Stripe"],
//     icon: <Monitor className="w-12 h-12 text-green-400" />,
//     image: "/placeholder.svg?height=600&width=800",
//   },
//   {
//     id: 2,
//     title: "Portfolio Website",
//     description:
//       "Personal portfolio showcasing projects and skills with a modern design.",
//     techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
//     icon: <Palette className="w-12 h-12 text-purple-400" />,
//     image: "/placeholder.svg?height=600&width=800",
//   },
//   {
//     id: 3,
//     title: "Task Management App",
//     description:
//       "Collaborative task manager with real-time updates and team features.",
//     techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
//     icon: <Layers className="w-12 h-12 text-blue-400" />,
//     image: "/placeholder.svg?height=600&width=800",
//   },
//   {
//     id: 4,
//     title: "Weather Dashboard",
//     description:
//       "Real-time weather information with forecasts and historical data visualization.",
//     techStack: ["React", "Chart.js", "OpenWeather API"],
//     icon: <Code className="w-12 h-12 text-yellow-400" />,
//     image: "/placeholder.svg?height=600&width=800",
//   },
//   {
//     id: 5,
//     title: "Social Media Platform",
//     description:
//       "Connect with friends, share updates, and discover new content.",
//     techStack: ["React Native", "GraphQL", "AWS Amplify"],
//     icon: <Github className="w-12 h-12 text-pink-400" />,
//     image: "/placeholder.svg?height=600&width=800",
//   },
// ];

export default function ProjectsParallax() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const prj = await getProjects();
      const projectWithUrls = await Promise.all(
        prj.map(async (project: ProjectProps) => {
          const signedUrl = await getS3SignedUrl(project.images[0]);
          const url = signedUrl?.url ?? "";
          return { ...project, images: url };
        })
      );
      setProjects(projectWithUrls);
    }
    fetchProjects();
  }, []);
  return (
    <div id="projects-showcase">
      {/* Add page heading */}
      <header className="page-header">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="back-button-container"
        >
          <a href="/" className="back-button" aria-label="Back to home">
            <ArrowLeft size={24} />
          </a>
        </motion.div>
        <div className="title-container">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="page-title"
          >
            Projects
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="title-underline"
          />
        </div>
      </header>

      {projects.map((project, index) => (
        <Project key={index} {...project} index={index + 1} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
      html {
         scroll-snap-type: y mandatory;
     }

     #projects-showcase {
         background-color: var(--black);
         min-height: 100vh;
         position: relative;
     }

     /* Page header styles */
     .page-header {
         position: fixed;
         top: 40px;
         left: 40px;
         z-index: 100;
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         gap: 20px;
     }

     .back-button-container {
         display: flex;
         align-items: center;
     }

     .back-button {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 40px;
         height: 40px;
         border-radius: 50%;
         background: rgba(255, 255, 255, 0.05);
         color: var(--white);
         transition: all 0.3s ease;
     }

     .back-button:hover {
         background: rgba(141, 240, 204, 0.2);
         color: var(--hue-6);
         transform: translateX(-3px);
     }

     .title-container {
         display: flex;
         flex-direction: column;
     }

     .page-title {
         font-family: "Azeret Mono", monospace;
         font-size: 48px;
         font-weight: 700;
         color: var(--white);
         margin: 0;
         letter-spacing: -1px;
     }

     .title-underline {
         height: 4px;
         background: var(--hue-6);
         margin-top: 8px;
         border-radius: 2px;
     }

     .project-container {
         height: 100vh;
         scroll-snap-align: start;
         display: flex;
         justify-content: center;
         align-items: center;
         position: relative;
         padding: 0 20px;
     }

     .project-card {
         width: 800px;
         background: rgba(255, 255, 255, 0.03);
         backdrop-filter: blur(10px);
         border-radius: 16px;
         overflow: hidden;
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
         border: 1px solid rgba(255, 255, 255, 0.1);
         display: flex;
         flex-direction: column;
         position: relative;
         z-index: 1;
     }

     .project-image-container {
         width: 100%;
         height: 300px;
         overflow: hidden;
     }

     .project-image {
         width: 100%;
         height: 100%;
         object-fit: cover;
         transition: transform 0.5s ease;
     }

     .project-card:hover .project-image {
         transform: scale(1.05);
     }

     .project-content {
         padding: 30px;
         display: flex;
         flex-direction: column;
         gap: 20px;
     }

     .project-header {
         display: flex;
         align-items: center;
         gap: 16px;
     }

     .project-icon {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 64px;
         height: 64px;
         border-radius: 12px;
         background: rgba(255, 255, 255, 0.05);
     }

     .project-title {
         font-family: "Inter", sans-serif;
         font-size: 28px;
         font-weight: 700;
         margin: 0;
         color: var(--white);
     }

     .project-description {
         font-size: 18px;
         line-height: 1.6;
         color: var(--white-feint);
     }

     .project-technologies {
         display: flex;
         flex-wrap: wrap;
         gap: 8px;
         margin-bottom: 10px;
     }

     .project-tech-tag {
         background: rgba(141, 240, 204, 0.1);
         color: var(--hue-6);
         padding: 6px 12px;
         border-radius: 20px;
         font-size: 14px;
         font-weight: 500;
     }

     .project-links {
         display: flex;
         gap: 16px;
     }

     .project-link {
         display: flex;
         align-items: center;
         gap: 8px;
         color: var(--white);
         text-decoration: none;
         font-weight: 500;
         transition: color 0.2s ease;
     }

     .project-link:hover {
         color: var(--hue-6);
     }

     .project-number {
         color: var(--hue-6);
         margin: 0;
         font-family: "Azeret Mono", monospace;
         font-size: 120px;
         font-weight: 700;
         letter-spacing: -3px;
         line-height: 1.2;
         position: absolute;
         display: inline-block;
         top: calc(50% - 60px);
         left: calc(50% + 450px);
         opacity: 0.2;
         z-index: 0;
     }

     .progress {
         position: fixed;
         left: 0;
         right: 0;
         height: 5px;
         background: var(--hue-6);
         bottom: 50px;
         transform: scaleX(0);
     }

     @media (max-width: 1200px) {
         .project-number {
             left: calc(50% + 350px);
         }
     }

     @media (max-width: 992px) {
         .project-card {
             width: 90%;
         }
         
         .project-number {
             font-size: 100px;
             left: calc(50% + 300px);
         }
     }

     @media (max-width: 768px) {
         .page-header {
             top: 20px;
             left: 20px;
             gap: 15px;
         }
         
         .page-title {
             font-size: 36px;
         }
         
         .project-card {
             width: 90%;
         }

         .project-image-container {
             height: 250px;
         }

         .project-number {
             font-size: 80px;
             top: calc(50% - 40px);
             left: calc(50% + 200px);
         }

         .project-title {
             font-size: 24px;
         }

         .project-description {
             font-size: 16px;
         }

         .back-button {
             width: 36px;
             height: 36px;
         }
     }

     @media (max-width: 576px) {
         .page-header {
             top: 15px;
             left: 15px;
             gap: 10px;
         }
         
         .page-title {
             font-size: 28px;
         }
         
         .project-card {
             width: 100%;
         }

         .project-image-container {
             height: 200px;
         }

         .project-content {
             padding: 20px;
         }

         .project-number {
             font-size: 60px;
             top: 20px;
             left: auto;
             right: 20px;
         }

         .project-header {
             flex-direction: column;
             align-items: flex-start;
             gap: 10px;
         }

         .project-icon {
             width: 48px;
             height: 48px;
         }

         .project-technologies {
             margin-bottom: 15px;
         }

         .project-tech-tag {
             padding: 4px 8px;
             font-size: 12px;
         }

         .back-button {
             width: 32px;
             height: 32px;
         }
     }
 `}</style>
  );
}
