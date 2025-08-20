"use client";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Backend Developer and DevOps",
      company: "PT. Indominco Mandiri",
      period: "Jun 2024 - Present",
      points: [
        "Developed and maintained backend services using modern technologies",
        "Implemented DevOps practices for continuous integration and deployment",
        "Collaborated with cross-functional teams to deliver scalable solutions",
        "Optimized application performance and monitoring systems"
      ],
      technologies: ["Java", "Docker", "Jenkins", "PostgreSQL", "GCP"]
    },
    {
      title: "Flutter Developer",
      company: "Project at Uni",
      period: "Aug 2024 - Nov 2024",
      points: [
        "Built cross-platform mobile applications using Flutter framework",
        "Implemented responsive UI designs and smooth user interactions",
        "Integrated APIs and managed state management efficiently",
        "Collaborated with team members using Git version control"
      ],
      technologies: ["Flutter", "Dart", "Firebase", "Git", "Figma"]
    },
    {
      title: "Backend Developer",
      company: "Project Uni",
      period: "Feb 2024 - May 2024",
      points: [
        "Designed and developed RESTful APIs for web applications",
        "Implemented database schemas and optimized query performance",
        "Worked with team members to integrate frontend and backend systems",
        "Applied software engineering best practices and code reviews"
      ],
      technologies: ["Express.js", "Node.js", "PostgreSQL", "JavaScript", "Postman"]
    },
    {
      title: "Cloud Computing Cohort",
      company: "Bangkit Academy",
      period: "Aug 2023 - Jan 2024",
      points: [
        "Learned cloud computing fundamentals and Google Cloud Platform services",
        "Participated in hands-on projects involving cloud infrastructure",
        "Collaborated with machine learning and mobile development cohorts",
        "Completed capstone project demonstrating cloud computing skills"
      ],
      technologies: ["Google Cloud", "Docker", "Kubernetes", "Terraform", "Python"]
    }
  ];

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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start mb-12 last:mb-0">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-primary z-10"></div>

              {/* Content */}
              <div className="ml-20">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {exp.title}
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
