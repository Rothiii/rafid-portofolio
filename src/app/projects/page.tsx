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

  // Return early if no project data
  if (!project || projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
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
                {/* Project Number */}
                {/* <div className="text-6xl xl:text-8xl font-extrabold text-outline mb-4">
                  {project.num}
                </div> */}

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
  );
};

export default ProjectsPage;
