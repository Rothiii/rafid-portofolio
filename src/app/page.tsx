"use client";

// sections
import HeroSection from "@/section/hero";
import AboutSection from "@/section/about";
import SkillsSection from "@/section/skills";
import ProjectSection from "@/section/project";
import ExperienceSection from "@/section/experience";
import EducationSection from "@/section/education";
import ContactSection from "@/section/contact";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education Section */}
      <EducationSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
