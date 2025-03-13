"use client";
import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./project-card";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

interface ProjectItemProps {
  project: Project;
  id: number;
}

function ProjectItem({ project, id }: ProjectItemProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="project-container">
      <ProjectCard project={project} ref={ref} />
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className="project-number"
      >{`#${id.toString().padStart(2, "0")}`}</motion.h2>

      <style jsx>{`
        .project-container {
          height: 100vh;
          scroll-snap-align: start;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0 20px;
        }
      `}</style>
    </section>
  );
}

export default function ProjectsParallaxClient({
  projects,
}: {
  projects: Project[];
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} id={index + 1} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />

      <style jsx global>{`
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
          pointer-events: none;
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
          .project-number {
            font-size: 100px;
            left: calc(50% + 300px);
          }
        }

        @media (max-width: 768px) {
          .project-number {
            font-size: 80px;
            top: calc(50% - 40px);
            left: calc(50% + 200px);
          }
        }

        @media (max-width: 576px) {
          .project-number {
            font-size: 60px;
            top: 20px;
            left: auto;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
}
