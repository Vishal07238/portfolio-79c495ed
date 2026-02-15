import { useEffect, useState } from "react";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-glow hidden lg:block" style={{ left: pos.x, top: pos.y }} />;
};

const SectionDivider = () => <div className="section-divider mx-auto max-w-4xl" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <CursorGlow />
      <Navigation />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
