"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { links } from "@/lib/links";

const AssistTouch = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const homeSubSections = [
    { name: "Hero", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const visibleLinks = links.filter((link) => !link.hidden);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = 80; // Approximate navbar height

      // Show AssistTouch only when scrolled past navbar
      if (currentScrollY > navbarHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false); // Also close menu when hidden
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = homeSubSections.map((section) => ({
        id: section.href.substring(1),
        element: document.querySelector(section.href),
      }));

      const scrollPosition = window.scrollY + 100;

      // Default to hero section if at top or very close to top
      if (window.scrollY < 50) {
        setActiveSection("hero");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check - this will set hero as active on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, homeSubSections]);

  // Close assist touch menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isExpanded && !target.closest(".assist-touch-container")) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isExpanded]);

  const handleSectionClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
  };

  const handleLinkClick = () => {
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 assist-touch-container">
      {/* Main assist touch button */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-accent/30 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-accent" />
          ) : (
            <Menu className="w-6 h-6 text-accent" />
          )}
        </button>

        {/* Expanded menu */}
        {isExpanded && (
          <div className="absolute top-16 right-0 bg-primary/95 backdrop-blur-md border border-accent/20 rounded-lg shadow-xl py-3 min-w-[200px] max-h-[80vh] overflow-y-auto">
            {visibleLinks.map((link, index) => (
              <div key={index}>
                {link.name === "Home" && isHomePage ? (
                  <div>
                    <div className="px-4 py-2 text-sm font-medium text-accent border-b border-accent/10">
                      Home Sections
                    </div>
                    {homeSubSections.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSectionClick(section.href)}
                        className={`block w-full text-left px-6 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-all ${
                          activeSection === section.href.substring(1)
                            ? "text-accent bg-accent/10"
                            : ""
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                    <div className="border-b border-accent/10 my-2"></div>
                  </div>
                ) : (
                  <Link
                    href={link.path}
                    onClick={handleLinkClick}
                    className={`block px-4 py-2 text-sm capitalize hover:bg-accent/10 hover:text-accent transition-all ${
                      pathname === link.path ? "text-accent bg-accent/5" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistTouch;
