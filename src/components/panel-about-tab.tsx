"use client";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "./ui/input";

interface AboutPanelTabProps {
  aboutMe: AboutMe;
  setAboutMe: any;
  handleAboutMeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  saveMe: any;
}

export default function About_Panel_Tab({
  aboutMe,
  setAboutMe,
  handleAboutMeChange,
  saveMe,
}: AboutPanelTabProps) {
  const addExperience = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      experience: [
        { at: "", description: "", duration: "" },
        ...prev.experience,
      ],
    }));
  };
  const deleteExperience = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      experience: [...prev.experience.filter((_, i) => i != index)],
    }));
  };
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setAboutMe((prev: AboutMe) => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = { ...updatedExperience[index], [name]: value };
      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  const addRadarFullStack = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      radar: {
        fullstack: [...prev.radar.fullstack, { category: "", value: "" }],
        devops: prev.radar.devops,
      },
    }));
  };
  const deleteRadarFullStack = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      radar: {
        ...prev.radar,
        fullstack: prev.radar.fullstack.filter((_, i) => i !== index),
      },
    }));
  };
  const handleRadarFullStack = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setAboutMe((prev: AboutMe) => {
      const updatedNodes = [...prev.radar.fullstack];
      updatedNodes[index] = { ...updatedNodes[index], [name]: value };
      return {
        ...prev,
        radar: { fullstack: updatedNodes, devops: prev.radar.devops },
      };
    });
  };

  const addRadarDevops = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      radar: {
        devops: [...prev.radar.devops, { category: "", value: "" }],
        fullstack: prev.radar.fullstack,
      },
    }));
  };
  const deleteRadarDevops = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      radar: {
        ...prev.radar,
        devops: prev.radar.devops.filter((_, i) => i !== index),
      },
    }));
  };
  const handleRadarDevops = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setAboutMe((prev: AboutMe) => {
      const updatedNodes = [...prev.radar.devops];
      updatedNodes[index] = { ...updatedNodes[index], [name]: value };
      return {
        ...prev,
        radar: { devops: updatedNodes, fullstack: prev.radar.fullstack },
      };
    });
  };

  const addNode = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      techNodes: {
        nodes: [
          ...prev.techNodes.nodes,
          { id: "", category: "", description: "" },
        ],
        links: prev.techNodes.links,
      },
    }));
  };
  const deleteNode = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      techNodes: {
        ...prev.techNodes,
        nodes: prev.techNodes.nodes.filter((_, i) => i !== index),
      },
    }));
  };
  const handleNodeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setAboutMe((prev: AboutMe) => {
      const updatedNodes = [...prev.techNodes.nodes];
      updatedNodes[index] = { ...updatedNodes[index], [name]: value };
      return {
        ...prev,
        techNodes: { nodes: updatedNodes, links: prev.techNodes.links },
      };
    });
  };

  const addLink = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      techNodes: {
        links: [...prev.techNodes.links, { source: "", target: "" }],
        nodes: prev.techNodes.nodes,
      },
    }));
  };
  const deleteLink = (index: number) => {
    setAboutMe((prev: AboutMe) => ({
      ...prev,
      techNodes: {
        ...prev.techNodes,
        links: prev.techNodes.links.filter((_, i) => i !== index),
      },
    }));
  };
  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setAboutMe((prev: AboutMe) => {
      const updatedLinks = [...prev.techNodes.links];
      updatedLinks[index] = { ...updatedLinks[index], [name]: value };
      return {
        ...prev,
        techNodes: { nodes: prev.techNodes.nodes, links: updatedLinks },
      };
    });
  };

  return (
    <TabsContent value="about" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>
            Share information about your education, experience, and technical
            skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={aboutMe.title}
              onChange={handleAboutMeChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subTitle">Subtitle</Label>
            <Input
              id="subTitle"
              name="subTitle"
              value={aboutMe.subTitle}
              onChange={handleAboutMeChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter your educational background"
              value={aboutMe.description}
              onChange={handleAboutMeChange}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Resume</Label>
            <Input
              id="resume"
              name="resume"
              placeholder="Link to your resume"
              value={aboutMe.resume}
              onChange={handleAboutMeChange}
            />
          </div>
          <Label htmlFor="experience">Experience</Label>
          {aboutMe.experience.map((itm: Experience, index: number) => (
            <div className=" grid grid-cols-3 gap-4" key={index}>
              <div className="space-y-2">
                <Label htmlFor="experience">At</Label>
                <Input
                  id="experience-ar"
                  name="at"
                  placeholder="Where did you work at"
                  value={itm.at}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea
                  id="experience-description"
                  name="description"
                  placeholder="Describe your professional description"
                  value={itm.description}
                  onChange={(e) => handleExperienceChange(e, index)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="experience-duration"
                  name="duration"
                  placeholder="Professional experience duration, Eg: May 2023 - May 2025"
                  value={itm.duration}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div className=" grid grid-cols-2 gap-2">
                {aboutMe.experience.length > 1 && (
                  <Button
                    onClick={(e) => deleteExperience(index)}
                    className="w-full sm:w-auto cursor-pointer"
                  >
                    Delete Experience
                  </Button>
                )}
                {index == aboutMe.experience.length - 1 && (
                  <Button
                    onClick={(e) => addExperience(index)}
                    className="w-full sm:w-auto cursor-pointer"
                  >
                    Add Experience
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className=" grid grid-cols-4 gap-3">
            <div className="space-y-2">
              <Label htmlFor="github">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={aboutMe.email}
                onChange={handleAboutMeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">Github</Label>
              <Input
                id="github"
                name="github"
                placeholder="Link to your github"
                value={aboutMe.github}
                onChange={handleAboutMeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">Linked In</Label>
              <Input
                id="linkedIn"
                name="linkedIn"
                placeholder="Link to your linkedIn"
                value={aboutMe.linkedIn}
                onChange={handleAboutMeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leetcode">Leetcode</Label>
              <Input
                id="leetcode"
                name="leetcode"
                placeholder="Link to your leetcode"
                value={aboutMe.leetcode}
                onChange={handleAboutMeChange}
              />
            </div>
          </div>
          <Label htmlFor="techStack">Radar Chart</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">FullStack</h3>
              {aboutMe.radar.fullstack.map((itm: RadarVal, index: number) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      name="category"
                      placeholder="Eg: Backend"
                      value={itm.category}
                      onChange={(e) => handleRadarFullStack(e, index)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      name="value"
                      placeholder="Eg: 95%"
                      value={itm.value}
                      onChange={(e) => handleRadarFullStack(e, index)}
                    />
                  </div>
                  <div className="col-span-3 flex justify-between gap-3">
                    {aboutMe.radar.fullstack.length > 1 && (
                      <Button
                        onClick={() => deleteRadarFullStack(index)}
                        className="w-1/2"
                      >
                        Delete Node
                      </Button>
                    )}
                    {index === aboutMe.radar.fullstack.length - 1 && (
                      <Button
                        onClick={() => addRadarFullStack(index)}
                        className="w-1/2"
                      >
                        Add Node
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">DevOps</h3>
              {aboutMe.radar.devops.map((itm: RadarVal, index: number) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      name="category"
                      placeholder="Eg: Backend"
                      value={itm.category}
                      onChange={(e) => handleRadarDevops(e, index)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      name="value"
                      placeholder="Eg: 95%"
                      value={itm.value}
                      onChange={(e) => handleRadarDevops(e, index)}
                    />
                  </div>
                  <div className="col-span-3 flex justify-between gap-3">
                    {aboutMe.radar.devops.length > 1 && (
                      <Button
                        onClick={() => deleteRadarDevops(index)}
                        className="w-1/2"
                      >
                        Delete Node
                      </Button>
                    )}
                    {index === aboutMe.radar.devops.length - 1 && (
                      <Button
                        onClick={() => addRadarDevops(index)}
                        className="w-1/2"
                      >
                        Add Node
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Label htmlFor="techStack">Tech Nodes</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tech Nodes</h3>
              {aboutMe.techNodes.nodes.map(
                (itm: TechNodeItem, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-3">
                    <div className="space-y-2">
                      <Label>ID</Label>
                      <Input
                        name="id"
                        placeholder="Eg: MongoDB"
                        value={itm.id}
                        onChange={(e) => handleNodeChange(e, index)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        name="category"
                        placeholder="Eg: Backend"
                        value={itm.category}
                        onChange={(e) => handleNodeChange(e, index)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        name="description"
                        placeholder="Eg: No SQL Database"
                        value={itm.description}
                        onChange={(e) => handleNodeChange(e, index)}
                      />
                    </div>
                    <div className="col-span-3 flex justify-between gap-3">
                      {aboutMe.techNodes.nodes.length > 1 && (
                        <Button
                          onClick={() => deleteNode(index)}
                          className="w-1/2"
                        >
                          Delete Node
                        </Button>
                      )}
                      {index === aboutMe.techNodes.nodes.length - 1 && (
                        <Button
                          onClick={() => addNode(index)}
                          className="w-1/2"
                        >
                          Add Node
                        </Button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tech Links</h3>
              {aboutMe.techNodes.links.map((itm: Link, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input
                      name="source"
                      placeholder="Eg: MongoDB"
                      value={itm.source}
                      onChange={(e) => handleLinkChange(e, index)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target</Label>
                    <Input
                      name="target"
                      placeholder="Eg: Express"
                      value={itm.target}
                      onChange={(e) => handleLinkChange(e, index)}
                    />
                  </div>
                  <div className="col-span-2 flex justify-between gap-3">
                    {aboutMe.techNodes.links.length > 1 && (
                      <Button
                        onClick={() => deleteLink(index)}
                        className="w-1/2"
                      >
                        Delete Link
                      </Button>
                    )}
                    {index === aboutMe.techNodes.links.length - 1 && (
                      <Button onClick={() => addLink(index)} className="w-1/2">
                        Add Link
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={saveMe} className="w-full sm:w-auto cursor-pointer">
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
