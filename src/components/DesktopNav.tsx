"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// lib
import { links } from "@/lib/links";
import { Button } from "./ui/button";

const DesktopNav = () => {
  const pathname = usePathname();
  const visibleLinks = links.filter(link => !link.hidden);
  return (
    <nav className="flex gap-8">
      {visibleLinks.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`${
            link.path === pathname && "text-accent border-accent border-b-2"
          } capitalize font-medium hover:text-accent transition-all`}
        >
          {link.name}
        </Link>
      ))}
      <Link href="/contact">
        <Button
          className={`${
            pathname === "/contact"
              ? "text-white border-b-2 border-white "
              : ""
          }`}
        >
          Contact Me
        </Button>
      </Link>
    </nav>
  );
};

export default DesktopNav;
