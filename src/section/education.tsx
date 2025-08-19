"use client";

const EducationSection = () => {
  const education = [
    {
      degree: "Full Stack Web Development",
      institution: "Online Course Platform",
      year: "2024",
      description:
        "Comprehensive full-stack development course covering modern web technologies",
      icon: "💻",
    },
    {
      degree: "Cloud Computing Cohort",
      institution: "Bangkit Academy",
      year: "Aug 2023 - Jan 2024",
      description:
        "Intensive 6-month program focusing on Google Cloud Platform and cloud architecture",
      icon: "☁️",
    },
    {
      degree: "Programming Course",
      institution: "Coursera",
      year: "Aug 2023 - Jan 2024",
      description:
        "Advanced programming concepts and software development practices",
      icon: "👨‍💻",
    },
    {
      degree: "Cloud Computing Course",
      institution: "Google Cloud Skill Boost",
      year: "2023 - Present",
      description:
        "Ongoing certification program for Google Cloud Platform services and solutions",
      icon: "🏅",
    },
    {
      degree: "Programming Course",
      institution: "Dicoding",
      year: "2021 - Present",
      description:
        "Continuous learning platform for Indonesian developers covering various programming topics",
      icon: "📚",
    },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            "Education is the most powerful weapon which you can use to change
            the world."
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>

          {education.map((edu, index) => (
            <div
              key={index}
              className="relative flex items-start mb-12 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-primary z-10"></div>

              {/* Content */}
              <div className="ml-20">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start flex-1">
                      <span className="text-2xl mr-4 mt-1">{edu.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-accent font-medium mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-white/60 text-sm mb-3">
                          {edu.year}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
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

export default EducationSection;
