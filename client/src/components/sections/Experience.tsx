import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, CheckCircle, Lightbulb, Code, Brain } from "lucide-react"; // Added new icons
import TiltCard from "@/components/3d/TiltCard";
import SkillSphere from "@/components/3d/SkillSphere";
import InteractiveTimeline from "@/components/3d/InteractiveTimeline";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Skill data
const frontendSkills = [
  { name: "HTML", level: "Experienced" },
  { name: "CSS", level: "Experienced" },
  { name: "SASS", level: "Intermediate" },
  { name: "JavaScript", level: "Basic" },
  { name: "React JS", level: "Intermediate" },
];

const mlSkills = [
  { name: "Python", level: "Experienced" },
  { name: "Deep Learning", level: "Intermediate" },
  { name: "Java", level: "Experienced" },
  { name: "Computer Vision", level: "Intermediate" },
  { name: "SQL", level: "Intermediate" },
];

// All skills for 3D sphere - added more diverse skills
const allSkills = [
  "Python",
  "JavaScript",
  "React",
  "HTML",
  "CSS",
  "ML",
  "AI",
  "Data Science",
  "TensorFlow",
  "SQL",
  "Java",
  "Computer Vision",
  "NLP",
  "Deep Learning",
  "Docker",
  "Git",
  "AWS",
  "Azure",
  "Figma",
  "Node.js",
  "Express.js",
  "MongoDB",
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Setup GSAP animations with ScrollTrigger for other elements
    const elements = section.querySelectorAll(".exp-animate");

    elements.forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out", // Smoother easing
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
          // markers: true, // Uncomment for debugging scroll trigger
        },
      });
    });

    // --- IMPORTANT: The ScrollTrigger parallax effect for .skill-sphere-wrapper has been REMOVED ---
    // This was the most likely cause of the persistent rotation.
    // If you wish to re-add a subtle non-rotational parallax later, do so carefully.

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      // Apply global section padding and gap from tailwind.config.js
      // Removed mb-section-gap here. The padding of the next section will handle separation.
      className="relative min-h-screen py-section-y px-6 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10 perspective">
        <p className="exp-animate text-center text-lg font-semibold text-primary mb-2">
          Explore My
        </p>
        <h2 className="exp-animate text-center text-4xl font-bold mb-16 relative">
          Experience
          <span className="absolute left-1/2 -bottom-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full transform -translate-x-1/2"></span>
          {/* Underline effect */}
        </h2>

        {/* Interactive Timeline */}
        <div className="exp-animate mb-24">
          <h3 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
            <Lightbulb className="h-7 w-7 text-accent" /> {/* Added icon */}
            My Journey & Milestones
            <span className="text-accent">.</span>
          </h3>
          <InteractiveTimeline />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Frontend Development */}
          <TiltCard>
            <div
              className="exp-animate relative group overflow-hidden rounded-xl p-8 shadow-2xl border border-border transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/30"
              style={{
                background: "linear-gradient(135deg, #6366f180, #ec489980)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {/* Animated background - more subtle */}
              <div className="absolute inset-0 opacity-10 bg-card transition-opacity duration-300 group-hover:opacity-20 pointer-events-none"></div>

              {/* Glowing accent border - around the whole card */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  border: "1px solid transparent",
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                  backgroundImage:
                    "linear-gradient(#1e293b, #1e293b), linear-gradient(135deg, #6366f1, #ec4899)",
                }}
              ></div>

              <h3 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg flex items-center justify-center gap-2">
                <Code className="h-6 w-6 text-indigo-200" /> {/* Added icon */}
                Frontend Development
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {frontendSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start group/skill transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/15 backdrop-blur-sm transform hover:-translate-y-1"
                  >
                    <CheckCircle className="text-green-300 h-5 w-5 mr-3 flex-shrink-0 mt-0.5 group-hover/skill:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-lg font-medium text-white group-hover/skill:text-white/90">
                        {skill.name}
                      </h4>
                      <p className="text-white/70 text-sm group-hover/skill:text-white/80">
                        {skill.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Machine Learning / Data Science */}
          <TiltCard>
            <div
              className="exp-animate relative group overflow-hidden rounded-xl p-8 shadow-2xl border border-border transition-all duration-500 hover:scale-[1.02] hover:shadow-teal-400/30"
              style={{
                background: "linear-gradient(135deg, #14b8a680, #3b82f680)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute inset-0 opacity-10 bg-card transition-opacity duration-300 group-hover:opacity-20 pointer-events-none"></div>

              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  border: "1px solid transparent",
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                  backgroundImage:
                    "linear-gradient(#1e293b, #1e293b), linear-gradient(135deg, #14b8a6, #3b82f6)",
                }}
              ></div>

              <h3 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg flex items-center justify-center gap-2">
                <Brain className="h-6 w-6 text-cyan-200" /> {/* Added icon */}
                Machine Learning | Data Science
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mlSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start group/skill transition-all duration-300 p-3 rounded-lg bg-white/5 hover:bg-white/15 backdrop-blur-sm transform hover:-translate-y-1"
                  >
                    <CheckCircle className="text-green-300 h-5 w-5 mr-3 flex-shrink-0 mt-0.5 group-hover/skill:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-lg font-medium text-white group-hover/skill:text-white/90">
                        {skill.name}
                      </h4>
                      <p className="text-white/70 text-sm group-hover/skill:text-white/80">
                        {skill.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* 3D Skills Visualization - SkillSphere */}
        {/* Reduced mt-32 to mt-24, removed min-h and mb-2 */}
        <div className="exp-animate skill-sphere-wrapper w-full relative flex flex-col items-center justify-center mt-24">
          <h3 className="text-3xl font-bold text-center mb-8">My Tech Stack</h3>
          <SkillSphere skills={allSkills} />
        </div>
      </div>{" "}
      {/* This closes the max-w-6xl mx-auto relative z-10 perspective div */}
      {/* Navigation Arrow - MOVED OUTSIDE THE max-w-6xl div */}
      {/* Changed bottom-4 to bottom-0, or even -bottom-8 to bring it closer to the actual bottom edge */}
      <div className="exp-animate absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer z-[999]">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            const projectsSection = document.getElementById("projects");
            if (projectsSection)
              projectsSection.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Scroll to Projects section"
          className="w-16 h-16 flex items-center justify-center rounded-full  duration-300 animate-pulse-slow"
        >
          <ChevronDown className="h-8 w-9 text-primary animate-bounce" />
          {/* Larger icon, slower bounce */}
        </a>
      </div>
    </section>
  );
}
