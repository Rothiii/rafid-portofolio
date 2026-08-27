import { skills } from "@/data/resume";
import SectionHeading from "@/components/SectionHeading";

const categories: Record<string, string[]> = {
  Backend: [
    "TypeScript",
    "JavaScript",
    "Java",
    "Python",
    "ExpressJS",
    "PostgreSQL",
    "MySQL",
    "Firebase",
  ],
  "DevOps & Cloud": [
    "Docker",
    "Jenkins",
    "Nginx",
    "PM2 Process Manager",
    "Google Cloud Platform",
    "Git",
  ],
  Frontend: ["React", "NextJS", "TailwindCSS"],
  Tools: ["Figma", "Postman"],
};

const SkillsSection = () => {
  const byName = new Map(skills.items.map((item) => [item.name, item]));

  return (
    <section id="skills" className="py-12 xl:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="skills"
          description="Technologies and tools I work with to bring ideas to life."
        />

        <div className="space-y-8 max-w-3xl">
          {Object.entries(categories).map(([category, names]) => (
            <div key={category}>
              <h3 className="font-primary text-accent text-xs uppercase tracking-wide mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {names.map((name) => {
                  const skill = byName.get(name);
                  if (!skill) return null;
                  return (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-theme-fg/15 rounded font-primary text-xs text-theme-fg/80 hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      <span className="text-accent text-sm">{skill.icon}</span>
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
