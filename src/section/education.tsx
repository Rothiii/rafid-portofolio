import { education } from "@/data/resume";
import SectionHeading from "@/components/SectionHeading";

const EducationSection = () => {
  return (
    <section id="education" className="py-12 xl:py-24">
      <div className="container mx-auto">
        <SectionHeading title="education" />

        <div className="max-w-3xl divide-y divide-theme-fg/10 border-t border-theme-fg/10">
          {education.items.map((edu) => (
            <div
              key={`${edu.institution}-${edu.degree}`}
              className="py-6 flex flex-col sm:flex-row sm:gap-8"
            >
              <span className="font-primary text-accent text-xs shrink-0 sm:w-32 mb-2 sm:mb-0 sm:pt-1">
                {edu.duration}
              </span>

              <div>
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-theme-fg/60 text-sm">{edu.institution}</p>
                {edu.score && (
                  <p className="text-theme-fg/70 text-sm mt-1">{edu.score}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
