import Link from "next/link";

// components
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <header className="xl:hidden sticky top-0 z-40 py-5 text-theme-fg bg-page-bg/80 backdrop-blur-md border-b border-theme-fg/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-primary font-semibold">
          Rafid<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
