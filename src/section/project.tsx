"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/project";

const ProjectSection = () => {
  // Show only first 3 projects
  const latestProjects = projects.slice(0, 3);
  const [selectedProject, setSelectedProject] = useState(latestProjects[0]);

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Latest Projects
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            "My code not perfect, but its mine. And I am proud of it."
          </p>
        </div>

        {/* Project Showcase */}
        <div className="flex flex-col xl:flex-row xl:gap-[30px] mb-12">
          {/* Project Details */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {selectedProject.num}
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {selectedProject.category} project
              </h2>
              {/* project description */}
              <p className="text-white/60">{selectedProject.description}</p>
              {/* stack */}
              <ul className="flex flex-wrap gap-4">
                {selectedProject.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {/* remove the last comma */}
                    {index !== selectedProject.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                {selectedProject.live && (
                  <Link
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
                {/* github project button */}
                {selectedProject.github && (
                  <Link
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsGithub className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Github repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Project Image */}
          <div className="w-full xl:w-[50%]">
            <div className="xl:h-[520px] mb-12">
              <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded-xl overflow-hidden">
                {/* overlay */}
                <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                {/* project image */}
                <div className="relative w-full h-full">
                  <Image
                    src={selectedProject.image}
                    fill
                    className="object-cover"
                    alt={selectedProject.title}
                  />
                  {/* logo overlay */}
                  {selectedProject.logo && (
                    <div className="absolute top-4 left-4 z-20 w-16 h-16 rounded-lg p-2">
                      <Image
                        src={selectedProject.logo}
                        fill
                        className="object-contain"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {latestProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
              className={`bg-white/5 backdrop-blur-sm rounded-xl border ${
                selectedProject.num === project.num
                  ? "border-accent"
                  : "border-white/10"
              } hover:border-accent/50 transition-all duration-300 overflow-hidden cursor-pointer group`}
            >
              {/* Project Image */}
              <div className="h-32 relative overflow-hidden">
                <Image
                  src={project.image}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={project.title}
                />
                {/* logo overlay */}
                {project.logo && (
                  <div className="absolute top-2 left-2 z-20 w-8 h-8 rounded-lg p-1">
                    <Image
                      src={project.logo}
                      fill
                      className="object-contain"
                      alt=""
                    />
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-accent font-bold text-lg">
                    {project.num}
                  </span>
                  <span className="text-white/60 text-xs">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-white/70 text-xs line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center">
          <Link href="/projects">
            <button className="px-8 py-3 bg-accent text-primary font-medium rounded-full hover:bg-accent/90 transition-colors duration-200">
              Show More Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
