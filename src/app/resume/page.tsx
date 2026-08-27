"use client";

import { motion } from "framer-motion";

// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// data
import { education, skills, about } from "@/data/resume";
import { experience } from "@/data/experience";

const ResumePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeIn" }}
      className="py-12 xl:py-24"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-10 xl:gap-16"
        >
          <TabsList className="flex flex-row xl:flex-col w-full xl:w-40 gap-2 flex-wrap">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <div className="w-full">
            {/* experience */}
            <TabsContent value="experience">
              <h1 className="h2 mb-2">{experience.title}</h1>
              <p className="text-theme-fg/70 mb-8 max-w-xl">
                {experience.description}
              </p>
              <ScrollArea className="h-[480px] pr-4">
                <div className="divide-y divide-theme-fg/10 border-t border-theme-fg/10">
                  {experience.items.map((item, index) => (
                    <div key={index} className="py-5 flex flex-col sm:flex-row sm:gap-6">
                      <span className="font-primary text-accent text-xs shrink-0 sm:w-32">
                        {item.period}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{item.position}</h3>
                        <p className="text-theme-fg/60 text-sm">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* education */}
            <TabsContent value="education">
              <h1 className="h2 mb-2">{education.title}</h1>
              <p className="text-theme-fg/70 mb-8 max-w-xl">
                {education.description}
              </p>
              <ScrollArea className="h-[480px] pr-4">
                <div className="divide-y divide-theme-fg/10 border-t border-theme-fg/10">
                  {education.items.map((item, index) => (
                    <div key={index} className="py-5 flex flex-col sm:flex-row sm:gap-6">
                      <span className="font-primary text-accent text-xs shrink-0 sm:w-32">
                        {item.duration}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{item.degree}</h3>
                        <p className="text-theme-fg/60 text-sm">{item.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills">
              <h1 className="h2 mb-2">{skills.title}</h1>
              <p className="text-theme-fg/70 mb-8 max-w-xl">
                {skills.description}
              </p>
              <div className="flex flex-wrap gap-2 max-w-2xl">
                {skills.items.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-theme-fg/15 rounded font-primary text-xs text-theme-fg/80"
                  >
                    <span className="text-accent text-sm">{item.icon}</span>
                    {item.name}
                  </span>
                ))}
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent value="about">
              <h1 className="h2 mb-2">{about.title}</h1>
              <p className="text-theme-fg/70 mb-8 max-w-xl">
                {about.description}
              </p>
              <dl className="max-w-md divide-y divide-theme-fg/10 border-t border-theme-fg/10">
                {about.info.map((item, index) => (
                  <div key={index} className="flex justify-between py-3">
                    <dt className="text-theme-fg/60">{item.name}</dt>
                    <dd className="font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ResumePage;
