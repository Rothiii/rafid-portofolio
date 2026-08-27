"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/project";
import SectionHeading from "@/components/SectionHeading";

const ProjectSection = () => {
  const latestProjects = projects.slice(0, 3);
  const [modalProject, setModalProject] = useState<
    (typeof projects)[number] | null
  >(null);

  const closeModal = () => setModalProject(null);

  return (
    <>
      <section id="projects" className="py-12 xl:py-24">
        <div className="container mx-auto">
          <SectionHeading
            title="projects"
            description="A selection of backend systems and APIs I've built and shipped."
          />

          <div className="max-w-3xl divide-y divide-theme-fg/10 border-t border-theme-fg/10">
            {latestProjects.map((project) => (
              <button
                key={project.num}
                onClick={() => setModalProject(project)}
                className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <div className="relative w-full sm:w-40 h-28 shrink-0 rounded overflow-hidden bg-theme-fg/5">
                  <Image
                    src={project.image}
                    fill
                    sizes="160px"
                    className="object-cover"
                    alt={project.title}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-accent text-sm mb-2 font-primary">
                    {project.category}
                  </p>
                  <p className="text-theme-fg/70 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <span
                        key={item.name}
                        className="font-primary px-2 py-0.5 border border-theme-fg/15 text-theme-fg/60 text-xs rounded"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mt-8 text-accent text-sm font-medium hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* Project Detail Modal */}
      {modalProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-page-bg rounded-2xl border border-theme-fg/10 p-6 md:p-8"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-theme-fg/10 hover:bg-theme-fg/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5"
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

            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
              <Image
                src={modalProject.image}
                fill
                sizes="640px"
                className="object-cover"
                alt={modalProject.title}
              />
            </div>

            <h2 className="text-2xl font-bold mb-1">{modalProject.title}</h2>
            <h3 className="text-accent font-primary text-sm mb-4">
              {modalProject.category}
            </h3>
            <p className="text-theme-fg/80 leading-relaxed mb-6">
              {modalProject.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {modalProject.stack.map((item) => (
                <span
                  key={item.name}
                  className="font-primary px-2 py-0.5 border border-theme-fg/15 text-theme-fg/60 text-xs rounded"
                >
                  {item.name}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {modalProject.live && (
                <Link
                  href={modalProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-accent text-primary font-medium rounded-full flex items-center gap-2 text-sm"
                >
                  <BsArrowUpRight />
                  Live
                </Link>
              )}
              {modalProject.github && (
                <Link
                  href={modalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-theme-fg/15 font-medium rounded-full flex items-center gap-2 text-sm hover:border-accent/50 transition-colors"
                >
                  <BsGithub />
                  Code
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectSection;
