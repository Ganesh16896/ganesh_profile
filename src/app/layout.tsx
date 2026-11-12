import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import { profile } from "@/lib/resume";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: `${profile.name} — Frontend Developer (React.js & Next.js)`,
  description: profile.summary,
  keywords: [
    "Dasari Ganesh",
    "Frontend Developer",
    "React.js",
    "Next.js",
    "Gatsby.js",
    "Tailwind CSS",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: `${profile.name} — Frontend Developer`,
    description: profile.summary,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${serif.variable} scroll-smooth`}
    >
      <body className="grain bg-ink text-bone antialiased selection:bg-ember selection:text-ink">
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
