import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import CursorFollower from "@/components/3d/CursorFollower";
import { useTheme } from "@/hooks/use-theme";

export default function Portfolio() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Set page title and meta description
    document.title = "Tony Saran | Portfolio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Tony Saran - Machine Learning Engineer, Data Scientist & Web Developer specializing in AI, machine learning, and web development."
      );
    }
  }, []);

  return (
    // No need to apply the theme class here as it's handled by useTheme hook on document level
    <>
      <CursorFollower />
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  );
}
