import ScrollyCanvas from "@/components/ScrollyCanvas";
import MarqueeStrip from "@/components/MarqueeStrip";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen bg-ink">
        <ScrollyCanvas />
        <MarqueeStrip />
        <About />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </>
  );
}
