import Link from "next/link";

// components
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import AssistTouch from "@/components/AssistTouch";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <>
      <header className="py-8 xl:py-12 text-theme-fg">
        <div className="container mx-auto flex justify-between items-center">
          {/* logo */}
          <Link href="/">
            <h1 className="text-5xl">
              Rafid<span className="text-accent">.</span>
            </h1>
          </Link>

          {/* desktop nav */}
          <div className="hidden xl:flex items-center gap-8">
            <DesktopNav />
            <ThemeToggle />
          </div>

          {/* mobile nav */}
          <div className="xl:hidden flex items-center gap-4">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>
      <AssistTouch />
    </>
  );
};

export default Header;
