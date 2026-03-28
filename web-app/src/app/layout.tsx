import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ChatWidget from "@/components/ChatWidget";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Henafek Homes | Premium Consulting & Infrastructure Solutions",
  description:
    "Professional multi-sector consulting, construction, engineering, real estate, and building materials solutions. Enterprise-grade infrastructure services.",
  keywords: [
    "consulting",
    "construction",
    "engineering",
    "real estate",
    "building materials",
    "infrastructure",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <Providers>
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
