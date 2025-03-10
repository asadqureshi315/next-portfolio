"use client";

import type React from "react";

import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  Code,
  ExternalLink,
  Github,
  Layers,
  Monitor,
  Palette,
} from "lucide-react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Update the ProjectProps interface to include an image property
interface ProjectProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  image: string;
}

// Update the Project component to include the image
function Project({
  id,
  title,
  slug,
  description,
  technologies,
  icon,
  image,
}: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="project-container">
      <div ref={ref} className="project-card">
        <div className="project-image-container">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="project-image"
          />
        </div>
        <div className="project-content">
          <div className="project-header">
            <div className="project-icon">{icon}</div>
            <h3 className="project-title hover:underline">
              <a href={`/projects/${slug}`}>{title}</a>
            </h3>
          </div>
          <p className="project-description">{description}</p>
          <div className="project-technologies">
            {technologies.map((tech, index) => (
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
      >{`#${id.toString().padStart(2, "0")}`}</motion.h2>
    </section>
  );
}

// Update the projects array to include images
const projects: ProjectProps[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    slug: "e-commerce",
    description:
      "A full-featured online store with cart, checkout, and payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    icon: <Monitor className="w-12 h-12 text-green-400" />,
    image:
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Portfolio Website",
    slug: "portfolio",
    description:
      "Personal portfolio showcasing projects and skills with a modern design.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    icon: <Palette className="w-12 h-12 text-purple-400" />,
    image:
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Task Management App",
    slug: "task-management",
    description:
      "Collaborative task manager with real-time updates and team features.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    icon: <Layers className="w-12 h-12 text-blue-400" />,
    image:
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    slug: "weather",
    description:
      "Real-time weather information with forecasts and historical data visualization.",
    technologies: ["React", "Chart.js", "OpenWeather API"],
    icon: <Code className="w-12 h-12 text-yellow-400" />,
    image:
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Social Media Platform",
    slug: "social-media",
    description:
      "Connect with friends, share updates, and discover new content.",
    technologies: ["React Native", "GraphQL", "AWS Amplify"],
    icon: <Github className="w-12 h-12 text-pink-400" />,
    image:
      "https://images.unsplash.com/photo-1736285034986-5be6ec8054b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ProjectsParallax() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="projects-showcase">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

// Update the StyleSheet component to include styles for the project image
function StyleSheet() {
  return (
    <style>{`
         html {
            scroll-snap-type: y mandatory;
        }

        #projects-showcase {
            background-color: var(--black);
            min-height: 100vh;
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
        }

        @media (max-width: 576px) {
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
        }
    `}</style>
  );
}
