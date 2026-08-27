import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Backend systems and APIs built by Rafid Al Khairy.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
