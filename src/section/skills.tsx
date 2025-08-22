"use client";

const SkillsSection = () => {
  const skills = [
    { name: "JavaScript", icon: "🟨", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: "🔷", url: "https://www.typescriptlang.org/" },
    { name: "React", icon: "⚛️", url: "https://reactjs.org/" },
    { name: "Next.js", icon: "▲", url: "https://nextjs.org/" },
    { name: "Node.js", icon: "🟢", url: "https://nodejs.org/" },
    { name: "Next.js", icon: "▲", url: "https://nextjs.org/" },
    { name: "Python", icon: "🐍", url: "https://www.python.org/" },
    { name: "Java", icon: "☕", url: "https://www.java.com/" },
    { name: "Docker", icon: "🐳", url: "https://www.docker.com/" },
    { name: "AWS", icon: "☁️", url: "https://aws.amazon.com/" },
    { name: "PostgreSQL", icon: "🐘", url: "https://www.postgresql.org/" },
    { name: "MongoDB", icon: "🍃", url: "https://www.mongodb.com/" },
    { name: "Git", icon: "🔧", url: "https://git-scm.com/" },
    { name: "Google Cloud Platform", icon: "☁️", url: "https://cloud.google.com/" },
    { name: "Firebase", icon: "🔥", url: "https://firebase.google.com/" },
    { name: "Tailwind CSS", icon: "🌀", url: "https://tailwindcss.com/" },
    { name: "Figma", icon: "🎨", url: "https://www.figma.com/" },
    { name: "Postman", icon: "📦", url: "https://www.postman.com/" }
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-accent/50 hover:scale-105 transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-4xl mb-3">{skill.icon}</div>
              <span className="text-white/90 text-sm font-medium text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
