import { getAboutMe } from "@/actions/aboutMeActions";
import SphericalText from "@/components/about/skill-sphere";

import SwitchableRadarChart from "@/components/about/radar-chart";
import Signature from "@/components/about/signature";
import BackButton from "@/components/project/back-button";
import { ArrowLeft, Briefcase, Github, Linkedin, Mail } from "lucide-react";
import ContactForm from "@/components/about/query-form";

export default async function AboutMe() {
  const me: AboutMe = await JSON.parse(await getAboutMe());
  const skills = me.techNodes.nodes.map((itm) => {
    return itm.id;
  });
  return (
    <div className="py-12 px-5">
      <BackButton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        <SwitchableRadarChart
          fullstack={me.radar.fullstack}
          devops={me.radar.devops}
        />

        <div className="lg:col-span-2 flex flex-col gap-3">
          <p className="text-3xl md:text-4xl font-bold my-3">{me.title}</p>
          <p className="text-lg md:text-xl italic text-gray-300 my-3">
            {me.subTitle}
          </p>

          {/* Description */}
          <div className="text-gray-400 space-y-2">
            {me.description
              .split(">")
              .filter((txt) => txt.trim() !== "")
              .map((txt, idx) => (
                <p key={idx}>{txt.trim()}</p>
              ))}
          </div>

          {/* Contact & Links */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <p className="flex items-center text-cyan-300 gap-2">
              {me.email}
              <Mail />
            </p>
            <p className="flex items-center gap-2 text-blue-400">
              <a href={me.linkedIn}>
                <Linkedin />
              </a>
            </p>
            <p className="flex items-center gap-2 text-white">
              <a href={me.github}>
                <Github />
              </a>
            </p>
            <a href={me.leetcode} className="text-yellow-400">
              Leetcode
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 h-40 md:h-80">
        <SphericalText skills={skills} />
      </div>

      <div className="max-w-4xl mx-auto p-6 hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Experience</h2>

        <div className="relative border-l border-gray-700 pl-6">
          {me.experience.map((exp, index) => (
            <div key={index} className="mb-8 relative">
              <div className="bg-[#212121] p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div className=" flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {exp.at}
                    </h3>
                  </div>
                  <span className="text-gray-400 text-sm">{exp.duration}</span>
                </div>

                <ul className="text-gray-300 list-disc pl-5 mt-2 space-y-1">
                  {exp.description
                    .split(">")
                    .filter((itm) => itm.trim() !== "")
                    .map((point, idx) => (
                      <li key={idx}>{point.trim()}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5">
        <Signature />
        <ContactForm />
      </div>
    </div>
  );
}
