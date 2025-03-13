"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { PlusCircle, Pencil, CrossIcon, XIcon, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deleteProject,
  getProjects,
  getS3SignedUrl,
  s3Delete,
  s3Upload,
  saveProject,
  updateProject,
} from "@/actions/projectActions";
import axios from "axios";
import Image from "next/image";
import Panel_Project_Tab from "@/components/panel-projects-list";
import About_Panel_Tab from "@/components/panel-about-tab";

export default function Dashboard() {
  const [aboutMe, setAboutMe] = useState({
    education: "",
    experience: "",
    techStack: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    _id: "",
    name: "",
    slug: "",
    at: "",
    description: "",
    techStack: "",
    duration: "",
    github: "",
    live: "",
    icon: "",
    images: [],
  });

  // const [images, setImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<Preview[]>([]);

  const handleAboutMeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAboutMe((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    setCurrentProject(null);
    setFormData({
      _id: "",
      name: "",
      slug: "",
      at: "",
      description: "",
      techStack: "",
      duration: "",
      github: "",
      live: "",
      icon: "",
      images: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setFormData(project);
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // setImage(file);
      const { url, fields, fileName, error } = await s3Upload(file);
      if (error) {
        console.log("Error getting upload URL:", error);
        return;
      }

      if (!url) {
        console.log("Presigned URL is undefined!");
        return;
      }

      if (!fields) {
        console.log("Fields are undefined!");
        return;
      }

      const formData = new FormData();
      Object.entries(fields || {}).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const response = await axios.post(url, formData);
      if (response.status == 204) {
        setFormData((prev) => {
          return {
            ...prev,
            images: [...prev.images, fileName],
          };
        });
      } else {
        console.error("Upload failed:", response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDeleteProject = async (project: Project) => {
    try {
      if (project.images && project.images.length > 0) {
        await Promise.all(
          project.images.map(async (itm) => {
            await s3Delete(itm);
          })
        );
      }
      await deleteProject(project._id);
      await getProjectData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSignedUrls = async () => {
      const urls = await Promise.all(
        formData.images.map(async (fileName) => {
          const response = await getS3SignedUrl(fileName);
          return { fileName, url: response?.url };
        })
      );

      setPreviewImages(
        urls.map((itm) => {
          return { fileName: itm.fileName, url: itm?.url ?? "" };
        })
      );
    };

    if (formData.images.length > 0) fetchSignedUrls();
  }, [formData.images]);

  useEffect(() => {
    if (currentProject) {
      const fetchSignedUrls = async () => {
        const urls = await Promise.all(
          currentProject.images.map(async (fileName) => {
            const response = await getS3SignedUrl(fileName);
            return { fileName, url: response?.url ?? "" };
          })
        );
        setPreviewImages(urls);
      };

      fetchSignedUrls();
    } else {
      setPreviewImages([]); // Reset when adding a new project
    }
  }, [currentProject]);

  const handleDeleteImage = async (selected: Preview) => {
    try {
      const res = await s3Delete(selected.fileName);
      if (res.success) {
        // setImages((prev) => prev.filter((itm) => itm !== selected.fileName));
        setFormData((prev) => {
          return {
            ...prev,
            images: prev.images.filter((itm) => itm != selected.fileName),
          };
        });
        setPreviewImages((prev) =>
          prev.filter((itm) => itm.fileName !== selected.fileName)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveProject = async () => {
    if (currentProject) {
      const updatedProject = await JSON.parse(await updateProject(formData));
      setProjects(
        projects.map((p) => (p._id === currentProject._id ? updatedProject : p))
      );
    } else {
      const newProject = await JSON.parse(await saveProject(formData));

      setProjects([...projects, newProject]);
    }
    setIsDialogOpen(false);
  };

  async function getProjectData() {
    const prj = await getProjects();
    setProjects([...prj]);
  }

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div className="  mx-10 py-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Portfolio Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your profile and projects in one place.
        </p>
      </header>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList>
          <TabsTrigger value="about">About Me</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <About_Panel_Tab
          handleAboutMeChange={handleAboutMeChange}
          aboutMe={aboutMe}
        />

        <Panel_Project_Tab
          handleAddProject={handleAddProject}
          handleEditProject={handleEditProject}
          handleDeleteProject={handleDeleteProject}
          projects={projects}
        />
      </Tabs>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(e) => {
          setPreviewImages([{ fileName: "", url: "" }]);
          setIsDialogOpen;
        }}
      >
        <DialogContent className="sm:max-w-[500px]  max-h-[500px] overflow-scroll">
          <DialogHeader>
            <DialogTitle>
              {currentProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {currentProject
                ? "Update the details of your existing project."
                : "Fill in the details to add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleProjectChange}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleProjectChange}
                placeholder="Enter project slug"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">At</Label>
              <Input
                id="at"
                name="at"
                value={formData.at}
                onChange={handleProjectChange}
                placeholder="Where you worked on project"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleProjectChange}
                placeholder="Describe your project"
                className="min-h-[80px]"
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleProjectChange}
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleProjectChange}
                placeholder="e.g. 2 weeks, 3 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">Github Link</Label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleProjectChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live">Live Link</Label>
              <Input
                id="live"
                name="live"
                value={formData.live}
                onChange={handleProjectChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Icon">Icon</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleProjectChange}
                placeholder="icon name from lucide"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Photos</Label>
              <Input
                id="file"
                name="file"
                onChange={handleImageUpload}
                type="file"
                max={1}
              />
            </div>
            <div className=" grid grid-cols-3">
              {previewImages.map((itm, index) => (
                <div className="" key={index}>
                  <XIcon
                    className=" absolute bg-red cursor-pointer"
                    onClick={(e) => handleDeleteImage(itm)}
                  />
                  <Image
                    width={100}
                    height={100}
                    src={itm.url}
                    alt="project preview images"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Types
interface Project {
  _id: string;
  name: string;
  slug: string;
  at: string;
  description: string;
  techStack: string;
  duration: string;
  github: string;
  live: string;
  icon: string;
  images: string[];
}

interface Preview {
  fileName: string;
  url: string;
}
