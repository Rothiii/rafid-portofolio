import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { Analytics } from "@vercel/analytics/next"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetBrainsMono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rafid Al Khairy - Backend & DevOps Engineer",
    template: "%s | Rafid Al Khairy",
  },
  description:
    "Backend & DevOps engineer building production Node.js / PostgreSQL systems — REST APIs, CI/CD, cloud infrastructure.",
  keywords: [
    "backend engineer",
    "devops engineer",
    "node.js developer",
    "portfolio",
    "Rafid Al Khairy",
  ],
  openGraph: {
    title: "Rafid Al Khairy - Backend & DevOps Engineer",
    description:
      "Backend & DevOps engineer building production Node.js / PostgreSQL systems — REST APIs, CI/CD, cloud infrastructure.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafid Al Khairy - Backend & DevOps Engineer",
    description:
      "Backend & DevOps engineer building production Node.js / PostgreSQL systems — REST APIs, CI/CD, cloud infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetBrainsMono.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <Sidebar />
          <StairTransition />
          <div className="xl:pl-64">
            <PageTransition>{children}</PageTransition>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
