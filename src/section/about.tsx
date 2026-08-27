import { UserRound, Rocket, Target, Lightbulb } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const points = [
  {
    label: "who",
    icon: UserRound,
    text: "A backend-focused engineer who cares about system reliability, clean APIs, and infrastructure that doesn't fall over under load.",
  },
  {
    label: "what",
    icon: Rocket,
    text: "Backend services, REST APIs, CI/CD pipelines, and cloud infrastructure — end to end, from code to deployed system.",
  },
  {
    label: "goal",
    icon: Target,
    text: "Growing into a senior backend/DevOps role — owning systems end to end and mentoring others along the way.",
  },
  {
    label: "philosophy",
    icon: Lightbulb,
    text: "Boring, reliable infrastructure beats clever code. I'd rather ship something that stays up.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-12 xl:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="about"
          description="I'm a backend & DevOps engineer with a strong focus on server-side systems, database design, and deployment infrastructure. I build APIs and services that hold up in production, not just in a demo."
        />

        <dl className="max-w-2xl divide-y divide-theme-fg/10 border-t border-theme-fg/10">
          {points.map(({ label, icon: Icon, text }) => (
            <div key={label} className="flex gap-4 py-6">
              <Icon className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <dt className="font-primary text-accent text-xs uppercase tracking-wide mb-1">
                  {label}
                </dt>
                <dd className="text-theme-fg/80 leading-relaxed">{text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default AboutSection;
