"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { links } from "@/lib/links";

const DesktopNav = () => {
  const pathname = usePathname();
  const [showHomeSubmenu, setShowHomeSubmenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const homeSubSections = [
    { name: "Hero", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const visibleLinks = links.filter((link) => !link.hidden);
  const isHomePage = pathname === "/";

  // Active section detection with initial hero detection
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

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
  }, [isHomePage]);

  // Close dropdown when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showHomeSubmenu && !target.closest(".home-dropdown")) {
        setShowHomeSubmenu(false);
      }
    };

    // Close dropdown when scrolling
    const handleScroll = () => {
      if (showHomeSubmenu) {
        setShowHomeSubmenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showHomeSubmenu]);

  const handleSectionClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowHomeSubmenu(false);
  };

  return (
    <nav className="flex gap-8">
      {visibleLinks.map((link, index) => (
        <div key={index} className="relative">
          {link.name === "Home" && isHomePage ? (
            <div className="relative home-dropdown">
              <button
                onClick={() => setShowHomeSubmenu(!showHomeSubmenu)}
                className={`capitalize font-medium hover:text-accent transition-all flex items-center gap-1 ${
                  pathname === link.path
                    ? "text-accent border-b-2 border-accent"
                    : ""
                }`}
              >
                {link.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showHomeSubmenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showHomeSubmenu && (
                <div className="absolute top-full right-0 mt-2 bg-primary border border-accent/20 rounded-lg shadow-lg p-3 z-50">
                  <div className="flex gap-2 flex-wrap max-w-[400px]">
                    {homeSubSections.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => handleSectionClick(section.href, e)}
                        className={`px-3 py-1 text-sm rounded-md hover:bg-accent/10 hover:text-accent transition-all whitespace-nowrap ${
                          activeSection === section.href.substring(1)
                            ? "text-accent bg-accent/10"
                            : ""
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={link.path}
              className={`capitalize font-medium hover:text-accent transition-all ${
                pathname === link.path
                  ? "text-accent border-b-2 border-accent"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;
