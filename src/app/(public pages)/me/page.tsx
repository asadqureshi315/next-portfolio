import { getAboutMe } from "@/actions/aboutMeActions";
import SphericalText from "@/components/about/skill-sphere";

import SwitchableRadarChart from "@/components/about/radar-chart";
import Signature from "@/components/about/signature";
import BackButton from "@/components/project/back-button";
import { ArrowLeft, Briefcase, Github, Linkedin, Mail } from "lucide-react";
import ContactForm from "@/components/about/query-form";
import Image from "next/image";

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
          <p className=" text-2xl sm:text-3xl md:text-4xl font-bold my-3">
            {me.title}
          </p>
          <p className=" text-base sm:text-lg md:text-xl italic text-gray-300 my-3">
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
            <p className="flex items-center text-teal-500 gap-2">
              {me.email}
              <Mail />
            </p>
            <p className="flex items-center gap-2 text-blue-400">
              <a href={me.linkedIn} target="_blank">
                <Linkedin />
              </a>
            </p>
            <p className="flex items-center gap-2 text-white">
              <a href={me.github} target="_blank">
                <Github />
              </a>
            </p>
            <a href={me.leetcode} target="_blank" className=" -m-3">
              <svg
                fill="#ffffff"
                width="81px"
                height="81px"
                viewBox="-12 -12 48.00 48.00"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="0.00024000000000000003"
                className=" w-12 h-12 bg-black"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.048"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>LeetCode icon</title>
                  <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"></path>
                </g>
              </svg>
              {/* <img alt="leetcode-icon" src="/leetcode.png" /> */}
              {/* Leetcode */}
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
              <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div className=" flex gap-3">
                    <div className="bg-black p-2 rounded-full">
                      <Briefcase className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 whitespace-nowrap">
                      {exp.at}
                    </h3>
                  </div>
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {exp.duration}
                  </span>
                </div>

                <ul className="text-gray-700 list-disc pl-5 mt-2 space-y-1">
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

      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="w-full md:w-1/2 flex justify-center">
          <Signature />
        </div>
        <div className="w-full md:w-1/2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
