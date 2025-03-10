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

export default function About_Panel_Tab({ aboutMe, handleAboutMeChange }) {
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
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              name="education"
              placeholder="Enter your educational background"
              value={aboutMe.education}
              onChange={handleAboutMeChange}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              placeholder="Describe your professional experience"
              value={aboutMe.experience}
              onChange={handleAboutMeChange}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Textarea
              id="techStack"
              name="techStack"
              placeholder="List your technical skills and technologies"
              value={aboutMe.techStack}
              onChange={handleAboutMeChange}
              className="min-h-[100px]"
            />
          </div>
          <Button className="w-full sm:w-auto">Save Profile</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
