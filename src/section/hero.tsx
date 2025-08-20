"use client";

import { useState, useEffect } from "react";

// components
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";

const HeroSection = () => {
  const roles = [
    "Software Engineer",
    "Data Engineer Enthusiast",
    "Cloud/DevOps Enthusiast",
    "Backend Engineer",
  ];

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
  }, [charIndex, isTyping, currentRoleIndex, roles]);

  return (
    <section className="h-screen">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-4 xl:pb-20 h-full">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            {/* info */}
            <h2 className="h2 mb-6">
              Hello I'm
              <br />
              <span className="text-accent">Rafid Al Khairy</span>
            </h2>
            <div className="text-xl min-h-[28px]">
              <span className="text-white">I'm a {currentText}</span>
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
            <p className="max-w-[480px] my-5 text-white/80">
              Crafting innovative solutions with clean code and cutting-edge
              technologies. Ready to bring your next project to life. Let's
              build something amazing together.
            </p>
            {/* button and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <div className="mb-5 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-8 h-8 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
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
