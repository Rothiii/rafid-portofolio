"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderButtons from "@/components/WorkSliderButtons";
import { projects } from "@/data/project";

const ProjectsPage = () => {
  const [project, setProject] = useState(projects[0] || null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSlideChange = (swiper: any) => {
    setIsTransitioning(true);

    setTimeout(() => {
      const currentIndex = swiper.realIndex;
      if (projects[currentIndex]) {
        setProject(projects[currentIndex]);
      }
      setIsTransitioning(false);
    }, 200); // Half of the swiper transition duration
  };

  const handleProjectClick = (clickedProject: any) => {
    setSelectedProject(clickedProject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Return early if no project data
  if (!project || projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.4, ease: "easeIn" }}
        className="min-h-screen relative"
      >
        {/* Main Content Area - Full Screen Background Image with Swiper */}
        <div className="absolute inset-0">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            className="h-full w-full"
            onSlideChange={handleSlideChange}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={800}
          >
            {projects.map((projectItem, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <div className="relative w-full h-full">
                  {/* Project Background Image */}
                  <Image
                    src={projectItem.image}
                    fill
                    className="object-cover"
                    alt={projectItem.title}
                    priority={index === 0}
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20 z-10"></div>

                  {/* Project Logo - Top Left */}
                  {projectItem.logo && (
                    <div className="absolute top-6 left-6 z-30 w-16 h-16 p-2">
                      <Image
                        src={projectItem.logo}
                        fill
                        className="object-contain"
                        alt={`${projectItem.title} logo`}
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}

            {/* Slider Navigation Buttons */}
            <WorkSliderButtons
              containerStyles="flex gap-4 absolute top-6 right-6 z-30"
              buttonStyles="bg-white/10 backdrop-blur-sm hover:bg-accent text-white hover:text-primary text-[18px] w-[44px] h-[44px] flex justify-center items-center rounded-full transition-all duration-300"
              iconStyles=""
            />
          </Swiper>
        </div>

        {/* Informational Overlay - Bottom Panel */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                {/* Left Side - Project Information */}
                <motion.div
                  className="flex-1 max-w-2xl"
                  key={project.num} // Force re-render when project changes
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: isTransitioning ? 0 : 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {/* Project Title & Category */}
                  <motion.h1
                    className="text-3xl xl:text-5xl font-bold text-white mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {project.category}
                  </motion.h1>

                  {/* Project Description */}
                  <motion.p
                    className="text-lg text-white/80 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Technology Stack */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {project.stack.map((item, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full border border-accent/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + index * 0.1,
                        }}
                      >
                        {item.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Side - Call to Action & Social Links */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-12 h-12 bg-accent hover:bg-accent-hover text-primary rounded-full flex justify-center items-center transition-all duration-300 group-hover:scale-110">
                              <BsArrowUpRight className="text-xl" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>View Live Project</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                    )}

                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-12 h-12 bg-white/10 hover:bg-accent hover:text-primary text-white rounded-full flex justify-center items-center transition-all duration-300 group-hover:scale-110">
                              <BsGithub className="text-xl" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>View Source Code</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Grid Section */}
      <section className="py-16 bg-primary/50">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore my collection of development projects showcasing various
              technologies and solutions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentProjects.map((projectItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleProjectClick(projectItem)}
              >
                <div className="relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={projectItem.image}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      alt={projectItem.title}
                    />

                    {/* Featured Label */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-1 bg-accent text-primary text-xs font-semibold rounded">
                        FEATURED
                      </span>
                    </div>

                    {/* Project Logo Overlay */}
                    {projectItem.logo && (
                      <div className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded p-1">
                        <Image
                          src={projectItem.logo}
                          fill
                          className="object-contain"
                          alt={`${projectItem.title} logo`}
                        />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        {projectItem.live && (
                          <Link
                            href={projectItem.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-accent text-primary rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors"
                          >
                            <BsArrowUpRight className="text-lg" />
                          </Link>
                        )}
                        {projectItem.github && (
                          <Link
                            href={projectItem.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <BsGithub className="text-lg" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1 group-hover:text-accent transition-colors">
                      {projectItem.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-3 line-clamp-2">
                      {projectItem.category}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-1">
                      {projectItem.stack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {projectItem.stack.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                          +{projectItem.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4"
          >
            {/* Page Info */}
            <div className="text-white/60">
              Showing {startIndex + 1}-{Math.min(endIndex, projects.length)} of{" "}
              {projects.length} projects
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (!showPage) {
                      // Show ellipsis for gaps
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-white/40">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-accent text-primary font-semibold"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[90vw] h-[80vh] max-w-6xl bg-primary/95 rounded-2xl overflow-hidden border border-white/10"
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

            {/* Background Image - Fixed */}
            <div className="absolute inset-0">
              <Image
                src={selectedProject.image}
                fill
                className="object-cover"
                alt={selectedProject.title}
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Top gradient for better readability */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

              {/* Bottom gradient for content area */}
              <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
            </div>

            {/* Scrollable Content Container */}
            <div className="relative h-full flex flex-col">
              {/* Top Section - Logo (Fixed) */}
              <div className="flex-shrink-0 p-4 md:p-6 z-10">
                {selectedProject.logo && (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <Image
                      src={selectedProject.logo}
                      fill
                      className="object-contain"
                      alt={`${selectedProject.title} logo`}
                    />
                  </div>
                )}
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="min-h-full flex flex-col justify-end">
                  <div className="p-4 md:p-6 pb-8">
                    <div className="flex flex-col gap-6">
                      {/* Project Information */}
                      <div className="space-y-4">
                        {/* Project Number */}
                        <div className="text-4xl md:text-6xl xl:text-8xl font-extrabold text-outline">
                          {selectedProject.num}
                        </div>

                        {/* Project Title & Category */}
                        <div>
                          <h2 className="text-2xl md:text-4xl xl:text-6xl font-bold text-white mb-2 leading-tight">
                            {selectedProject.title}
                          </h2>
                          <h3 className="text-lg md:text-xl xl:text-2xl text-accent mb-4">
                            {selectedProject.category}
                          </h3>
                        </div>

                        {/* Project Description */}
                        <p className="text-base md:text-lg text-white/80 leading-relaxed">
                          {selectedProject.description}
                        </p>

                        {/* Technology Stack */}
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map(
                            (item: { name: string }, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 md:px-4 md:py-2 bg-accent/20 text-accent text-xs md:text-sm font-medium rounded-full border border-accent/30"
                              >
                                {item.name}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        {selectedProject.live && (
                          <Link
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className="w-full sm:w-auto px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-semibold rounded-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
                                  <BsArrowUpRight className="text-lg" />
                                  View Live
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>View Live Project</p>
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
                            className="group"
                          >
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
                                  <BsGithub className="text-lg" />
                                  Source Code
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>View Source Code</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectsPage;