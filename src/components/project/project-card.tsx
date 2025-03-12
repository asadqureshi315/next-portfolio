"use client";

import { forwardRef, JSX } from "react";
import {
  Code,
  ExternalLink,
  Github,
  Layers,
  Monitor,
  Palette,
} from "lucide-react";
import type React from "react";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string;
  type: string;
  images: string;
  slug: string;
  githubUrl: string;
  demoUrl: string;
}

const handleLinkClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project }, ref) => {
    return (
      <a href={`/projects/${project.slug}`} className="project-link-wrapper">
        <div ref={ref} className="project-card">
          <div className="project-image-container">
            <img
              src={project.images || ""}
              alt={project.name}
              className="project-image"
            />
          </div>
          <div className="project-content">
            <div className="project-header">
              <h3 className="project-title">{project.name}</h3>
            </div>
            <p className="project-description truncate w-[ch_200]">
              {project.description}
            </p>
            <div className="project-techStack">
              {project.techStack.split(",").map((tech, index) => (
                <span key={index} className="project-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            {/* <div className="project-links">
              <a
                href={project.githubUrl}
                className="project-action-link"
                onClick={handleLinkClick}
                aria-label={`View code for ${project.title}`}
              >
                <Github size={16} />
                <span>View Code</span>
              </a>
              <a
                href={project.demoUrl}
                className="project-action-link"
                onClick={handleLinkClick}
                aria-label={`View live demo for ${project.title}`}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            </div> */}
          </div>
        </div>

        <style jsx>{`
          .project-link-wrapper {
            text-decoration: none;
            color: inherit;
            display: block;
            width: 800px;
            max-width: 100%;
            position: relative;
            z-index: 1;
            transition: transform 0.3s ease;
          }

          .project-link-wrapper:hover {
            transform: translateY(-5px);
          }

          .project-link-wrapper:focus {
            outline: none;
          }

          .project-link-wrapper:focus .project-card {
            box-shadow: 0 0 0 2px var(--hue-6), 0 20px 40px rgba(0, 0, 0, 0.4);
          }

          .project-card {
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            position: relative;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }

          .project-link-wrapper:hover .project-card {
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2),
              0 0 15px rgba(141, 240, 204, 0.2);
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

          .project-link-wrapper:hover .project-image {
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

          .project-techStack {
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

          .project-action-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease, background-color 0.2s ease;
            padding: 8px 12px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            z-index: 2;
            position: relative;
          }

          .project-action-link:hover {
            color: var(--hue-6);
            background: rgba(255, 255, 255, 0.1);
          }

          .project-action-link:focus {
            outline: 2px solid var(--hue-6);
            outline-offset: 2px;
          }

          @media (max-width: 992px) {
            .project-link-wrapper {
              width: 90%;
            }
          }

          @media (max-width: 768px) {
            .project-image-container {
              height: 250px;
            }

            .project-title {
              font-size: 24px;
            }

            .project-description {
              font-size: 16px;
            }
          }

          @media (max-width: 576px) {
            .project-image-container {
              height: 200px;
            }

            .project-content {
              padding: 20px;
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

            .project-techStack {
              margin-bottom: 15px;
            }

            .project-tech-tag {
              padding: 4px 8px;
              font-size: 12px;
            }

            .project-action-link {
              padding: 6px 10px;
              font-size: 14px;
            }
          }
        `}</style>
      </a>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
