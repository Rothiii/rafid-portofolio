import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, education, and skills of Rafid Al Khairy.",
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
