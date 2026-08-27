"use client";

import { useState, useEffect } from "react";

// components
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import { FiDownload } from "react-icons/fi";

const roles = ["Backend Engineer", "DevOps Engineer", "Software Engineer"];

const HeroSection = () => {

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    if (isTyping) {
      if (charIndex < currentRole.length) {
        setIsComplete(false);
        const timeout = setTimeout(() => {
          setCurrentText(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsComplete(true);
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setIsComplete(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentRole.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, currentRoleIndex]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-t from-theme-fg/[0.04] via-transparent to-transparent"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-4 xl:pb-20 h-full">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            {/* info */}
            <h1 className="h2 mb-6">
              Hello I'm
              <br />
              <span className="text-accent">Rafid Al Khairy</span>
            </h1>
            <div className="text-xl min-h-[28px] font-primary">
              <span>I'm a {currentText}</span>
              <span
                className="text-accent"
                style={
                  isComplete
                    ? {
                        animation: "blink 0.8s infinite",
                        animationTimingFunction: "step-end",
                      }
                    : {}
                }
              >
                |
              </span>
            </div>
            <p className="max-w-[480px] my-5 text-theme-fg/80">
              Backend & DevOps engineer building production Node.js /
              PostgreSQL systems serving 1,000+ users — REST APIs, CI/CD, and
              cloud infrastructure.
            </p>
            {/* button and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <div className="mb-5 xl:mb-0">
                <p className="text-theme-fg/80">Let&apos;s connect</p>
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-8 h-8 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
              <a
                href="/assets/resume.pdf"
                download="Rafid-Al-Khairy-CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-500 text-sm font-medium"
              >
                <FiDownload className="text-lg" />
                Download CV
              </a>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-12 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
