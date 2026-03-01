const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-12 xl:py-24 bg-gradient-to-t from-theme-fg/[0.04] via-transparent to-transparent"
    >
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-theme-fg/80 text-lg max-w-2xl mx-auto">
            Get to know me better - my journey, passion, and what drives me
            forward
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-8 border border-theme-fg/10">
            <p className="text-theme-fg/90 text-lg leading-relaxed text-center max-w-4xl mx-auto">
              Hi there! 👋 I'm a passionate software engineer who loves turning
              ideas into reality through code. With a strong foundation in
              full-stack development and a keen interest in emerging
              technologies, I'm always excited to take on new challenges and
              learn something new every day.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Who I Am */}
          <div className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-6 border border-theme-fg/10 hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">👨‍💻</span>
              <h3 className="text-xl font-semibold">Who I Am</h3>
            </div>
            <p className="text-theme-fg/80 text-sm leading-relaxed">
              A dedicated software engineer with a passion for creating
              efficient, scalable solutions. I believe in writing clean code and
              following best practices.
            </p>
          </div>

          {/* What I Do */}
          <div className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-6 border border-theme-fg/10 hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🚀</span>
              <h3 className="text-xl font-semibold">What I Do</h3>
            </div>
            <p className="text-theme-fg/80 text-sm leading-relaxed">
              Full-stack development, cloud architecture, and DevOps automation.
              I love building end-to-end solutions that make a real impact.
            </p>
          </div>

          {/* My Goals */}
          <div className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-6 border border-theme-fg/10 hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🎯</span>
              <h3 className="text-xl font-semibold">My Goals</h3>
            </div>
            <p className="text-theme-fg/80 text-sm leading-relaxed">
              To become a senior engineer who mentors others and contributes to
              open source. Always striving to learn and grow in this
              ever-evolving field.
            </p>
          </div>

          {/* My Philosophy */}
          <div className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-6 border border-theme-fg/10 hover:border-accent/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">💡</span>
              <h3 className="text-xl font-semibold">
                My Philosophy
              </h3>
            </div>
            <p className="text-theme-fg/80 text-sm leading-relaxed">
              "Code is poetry written for machines but read by humans." I
              believe in continuous learning and sharing knowledge with the
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
