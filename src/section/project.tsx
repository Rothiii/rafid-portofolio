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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<
    (typeof projects)[number] | null
  >(null);

  const handleProjectClick = (project: (typeof projects)[number]) => {
    setModalProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalProject(null), 300);
  };

  return (
    <>
      <section 
      id="projects"
      className="py-20 bg-primary relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={selectedProject.image}
            fill
            className="object-cover transition-all duration-1000"
            alt={selectedProject.title}
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Project Logo Overlay */}
          {selectedProject.logo && (
            <div className="absolute top-6 left-6 w-12 h-12 md:w-16 md:h-16 p-2 z-10">
              <Image
                src={selectedProject.logo}
                fill
                className="object-contain"
                alt={`${selectedProject.title} logo`}
              />
            </div>
          )}
        </div>

        <div className="container mx-auto relative z-10 h-full flex flex-col">
          {/* Title */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest Projects
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              "My code not perfect, but its mine. And I am proud of it."
            </p>
          </div>

          {/* Hero Project Overview - Hidden on Mobile */}
          <div className="hidden lg:block flex-1 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-end">
              {/* Project Details */}
              <div className="space-y-6">
                <div className="text-6xl xl:text-8xl leading-none font-extrabold text-transparent text-outline">
                  {selectedProject.num}
                </div>

                <h3 className="text-3xl xl:text-5xl font-bold text-white leading-tight">
                  {selectedProject.category}
                </h3>

                <p className="text-lg text-white/80 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full border border-accent/30"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  {selectedProject.live && (
                    <Link
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-12 h-12 bg-accent hover:bg-accent-hover text-primary rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110">
                            <BsArrowUpRight className="text-xl" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Live project</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  )}
                  {selectedProject.github && (
                    <Link
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-12 h-12 bg-white/10 hover:bg-accent hover:text-primary text-white rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110">
                            <BsGithub className="text-xl" />
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

              {/* Spacer for image (image is background) */}
              <div className="hidden lg:block"></div>
            </div>
          </div>

          {/* Project Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {latestProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedProject(project);
                  // On mobile, open modal instead of just changing background
                  if (window.innerWidth < 1024) {
                    handleProjectClick(project);
                  }
                }}
                className={`bg-white/10 backdrop-blur-sm rounded-xl border ${
                  selectedProject.num === project.num
                    ? "border-accent"
                    : "border-white/20"
                } hover:border-accent/50 hover:bg-white/20 transition-all duration-300 overflow-hidden cursor-pointer group`}
              >
                {/* Project Image */}
                <div className="h-24 md:h-32 relative overflow-hidden">
                  <Image
                    src={project.image}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Logo overlay */}
                  {project.logo && (
                    <div className="absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 bg-white/90 rounded p-1">
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
                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent font-bold text-base md:text-lg">
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
          <div className="text-center mt-8 md:mt-12">
            <Link href="/projects">
              <button className="px-6 md:px-8 py-3 bg-accent text-primary font-medium rounded-full hover:bg-accent/90 transition-colors duration-200">
                Show More Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && modalProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center lg:hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[95vw] h-[85vh] bg-primary/95 rounded-2xl overflow-hidden border border-white/20"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white hover:text-accent transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={modalProject.image}
                fill
                className="object-cover"
                alt={modalProject.title}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              {/* Project Logo */}
              {modalProject.logo && (
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                  <Image
                    src={modalProject.logo}
                    fill
                    className="object-contain"
                    alt={`${modalProject.title} logo`}
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="text-4xl leading-none font-extrabold text-transparent text-outline">
                  {modalProject.num}
                </div>

                <h2 className="text-2xl font-bold text-white leading-tight">
                  {modalProject.title}
                </h2>

                <h3 className="text-lg text-accent">{modalProject.category}</h3>

                <p className="text-white/80 leading-relaxed">
                  {modalProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {modalProject.stack.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full border border-accent/30"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  {modalProject.live && (
                    <Link
                      href={modalProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <BsArrowUpRight className="text-lg" />
                      Live
                    </Link>
                  )}
                  {modalProject.github && (
                    <Link
                      href={modalProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <BsGithub className="text-lg" />
                      Code
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectSection;
