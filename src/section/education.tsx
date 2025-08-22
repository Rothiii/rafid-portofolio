"use client";
import { education } from "@/data/resume";
import { FaCalendar, FaMedal } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

const EducationSection = () => {
  return (
    <section
      id="education"
      className="py-12 xl:py-24 bg-gradient-to-t from-black/30 via-transparent to-transparent"
    >
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
          <div className="absolute left-1/4 transform -translate-x-px top-0 bottom-0 w-0.5 bg-accent/30"></div>

          {education.items.map((edu, index) => (
            <div
              key={index}
              className="relative flex justify-center mb-12 last:mb-0"
            >
              {/* Content - Centered with fixed width */}
              <div className="w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start flex-1">
                      <span className="text-2xl mr-4 mt-1">
                        <FaGraduationCap />
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-accent font-medium mb-1">
                          {edu.institution}
                        </p>
                        <div className="flex items-start">
                          <FaCalendar />
                          <p className="text-white/60 text-sm ml-3 mb-3">
                            {edu.duration}
                          </p>
                        </div>
                        {edu.score && (
                          <div className="flex items-start">
                            <FaMedal />
                            <p className="text-white/80 text-sm ml-3 leading-relaxed">
                              {edu.score}
                            </p>
                          </div>
                        )}
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
