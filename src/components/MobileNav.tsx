"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { links } from "@/lib/links";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleSectionClick = (href: string) => {
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Delay to allow sheet to close first
    setIsOpen(false);
    setShowHomeSubmenu(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowHomeSubmenu(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/" onClick={handleLinkClick}>
            <h1 className="text-4xl font-semibold">
              Rafid<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {visibleLinks.map((link, index) => (
            <div key={index} className="w-full">
              {link.name === "Home" && isHomePage ? (
                <div className="w-full">
                  <button
                    onClick={() => setShowHomeSubmenu(!showHomeSubmenu)}
                    className={`text-xl capitalize hover:text-accent transition-all w-full flex items-center justify-between ${
                      pathname === link.path ? "text-accent" : ""
                    }`}
                  >
                    {link.name}
                    {showHomeSubmenu ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {showHomeSubmenu && (
                    <div className="mt-4 ml-4 space-y-3">
                      {homeSubSections.map((section, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSectionClick(section.href)}
                          className={`block w-full text-left text-lg hover:text-accent transition-all py-1 ${
                            activeSection === section.href.substring(1)
                              ? "text-accent"
                              : ""
                          }`}
                        >
                          {section.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.path}
                  onClick={handleLinkClick}
                  className={`text-xl capitalize hover:text-accent transition-all ${
                    pathname === link.path ? "text-accent" : ""
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
