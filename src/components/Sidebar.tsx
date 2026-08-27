"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, homeSubSections } from "@/lib/links";
import ThemeToggle from "@/components/ThemeToggle";

const Sidebar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      if (window.scrollY < 50) {
        setActiveSection("");
        return;
      }
      for (let i = homeSubSections.length - 1; i >= 0; i--) {
        const el = document.querySelector(homeSubSections[i].href);
        if (el && scrollPosition >= (el as HTMLElement).offsetTop) {
          setActiveSection(homeSubSections[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleSectionClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden xl:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-theme-fg/10 px-6 py-8 z-40">
      <Link href="/" className="font-primary text-2xl font-semibold mb-10">
        Rafid<span className="text-accent">.</span>
      </Link>

      <nav className="flex flex-col gap-1 font-primary text-sm">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <div key={link.path}>
              <Link
                href={link.path}
                className={`block py-2 pl-3 border-l-2 transition-colors ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-theme-fg/70 hover:text-theme-fg hover:border-theme-fg/30"
                }`}
              >
                {link.name}
              </Link>

              {link.name === "Home" && isHomePage && (
                <div className="ml-3 border-l border-theme-fg/10 mb-2">
                  {homeSubSections.map((section) => (
                    <button
                      key={section.href}
                      onClick={() => handleSectionClick(section.href)}
                      className={`block w-full text-left py-1.5 pl-4 text-xs transition-colors ${
                        activeSection === section.href.substring(1)
                          ? "text-accent"
                          : "text-theme-fg/50 hover:text-theme-fg"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-between pt-6 border-t border-theme-fg/10">
        <span className="font-primary text-xs text-theme-fg/50">
          open to work
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
