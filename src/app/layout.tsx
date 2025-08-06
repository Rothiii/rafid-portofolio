import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import ConnectionTracker from "@/components/ConnectionTracker";
import ConnectionStatus from "@/components/ConnectionStatus";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetBrainsMono",
});

export const metadata: Metadata = {
  title: "Rafid Al Khairy Portofolio",
  description: "Web portofolio of Rafid Al Khairy",
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
      </body>
    </html>
  );
}
