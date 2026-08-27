import { experience } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 xl:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="experience"
          description="My journey from hello world to building production systems."
        />

        <div className="max-w-3xl divide-y divide-theme-fg/10 border-t border-theme-fg/10">
          {experience.items.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="py-6 flex flex-col sm:flex-row sm:gap-8"
            >
              <span className="font-primary text-accent text-xs shrink-0 sm:w-32 mb-2 sm:mb-0 sm:pt-1">
                {exp.period}
              </span>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <p className="text-theme-fg/60 text-sm mb-3">{exp.company}</p>

                <ul className="text-theme-fg/80 text-sm mb-4 space-y-1.5">
                  {exp.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-primary px-2 py-0.5 border border-theme-fg/15 text-theme-fg/60 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
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
