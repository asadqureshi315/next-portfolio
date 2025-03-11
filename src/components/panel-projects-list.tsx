import type React from "react";

import { PlusCircle, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TabsContent } from "@/components/ui/tabs";

interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  techStack: string;
  duration: string;
  images: string[];
}

interface ProjectPanelTabProps {
  projects: Project[];
  handleAddProject: any;
  handleEditProject: any;
  handleDeleteProject: any;
}

export default function Panel_Project_Tab({
  handleAddProject,
  handleEditProject,
  handleDeleteProject,
  projects,
}: ProjectPanelTabProps) {
  return (
    <TabsContent value="projects" className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              Manage your portfolio of projects.
            </CardDescription>
          </div>
          <Button
            onClick={handleAddProject}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Project</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tech Stack</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project: any) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.slug}</TableCell>
                  <TableCell>{project.techStack}</TableCell>
                  <TableCell>{project.duration}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditProject(project)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProject(project)}
                    >
                      <Trash className="h-4 w-4 stroke-red-500" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
