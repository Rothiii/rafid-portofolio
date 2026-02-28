import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import ConnectionTracker from "@/components/ConnectionTracker";
import ConnectionStatus from "@/components/ConnectionStatus";
import { Analytics } from "@vercel/analytics/next"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetBrainsMono",
});

export const metadata: Metadata = {
  title: "Rafid Al Khairy - Software Engineer Portfolio",
  description:
    "Software Engineer specializing in backend development, cloud architecture, and full-stack solutions.",
  keywords: [
    "software engineer",
    "backend developer",
    "full-stack developer",
    "portfolio",
    "Rafid Al Khairy",
  ],
  openGraph: {
    title: "Rafid Al Khairy - Software Engineer",
    description:
      "Software Engineer specializing in backend development, cloud architecture, and full-stack solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <ConnectionTracker />
        <ConnectionStatus />
        <Analytics />
      </body>
    </html>
  );
}
