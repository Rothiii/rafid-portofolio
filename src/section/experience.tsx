"use client";
import { experience } from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            My journey from hello world to building real-world applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>

          {experience.items.map((exp, index) => (
            <div key={index} className="relative flex mb-12 last:mb-0">
              {/* Timeline Dot */}
              <div className="absolute left-2.5 sm:left-6 w-4 h-4 bg-accent rounded-full border-4 border-primary z-10 mt-1"></div>

              {/* Content */}
              <div className="w-full ml-12 sm:ml-16">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-accent font-medium">{exp.company}</p>
                    </div>
                    <span className="text-white/60 text-sm mt-2 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="text-white/80 text-sm mb-4 space-y-2">
                    {exp.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
