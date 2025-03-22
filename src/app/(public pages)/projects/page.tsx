"use client";

import { Suspense, useEffect, useState } from "react";
import ProjectsParallaxClient from "@/components/project/projects-parallax-client";
import BackButton from "@/components/project/back-button";
import { Merriweather } from "next/font/google";
const playFair = Merriweather({ weight: "400", subsets: ["latin"] });

export default function ProjectsPage() {
  // Fetch projects data with caching
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);
  return (
    <div id="projects-showcase">
      {/* Add page heading */}
      <header className="page-header">
        <BackButton />
        <div className="title-container">
          <h1 className={`page-title ${playFair.className}`}>Projects</h1>
          <div className="title-underline" />
        </div>
      </header>

      <Suspense
        fallback={
          <div className="loading text-white text-xl">Loading projects...</div>
        }
      >
        <ProjectsParallaxClient projects={projects} />
      </Suspense>

      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
        }

        #projects-showcase {
          // background-color: #212121;
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

        .title-container {
          display: flex;
          flex-direction: column;
        }

        .page-title {
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
          width: 100px;
        }

        .loading {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--white);
          font-size: 24px;
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
        }
      `}</style>
    </div>
  );
}
