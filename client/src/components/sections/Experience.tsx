import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, CheckCircle } from "lucide-react";
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

// All skills for 3D sphere
const allSkills = [
  "Python", "JavaScript", "React", "HTML", "CSS", "ML", 
  "AI", "Data Science", "TensorFlow", "SQL", "Java", 
  "Computer Vision", "NLP", "Deep Learning"
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Setup GSAP animations with ScrollTrigger
    const elements = section.querySelectorAll(".exp-animate");
    
    elements.forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-16 lg:px-24 perspective"
    >
      <div className="max-w-6xl mx-auto">
        <p className="exp-animate text-center text-lg font-semibold text-primary mb-2">Explore My</p>
        <h2 className="exp-animate text-center text-4xl font-bold mb-16">Experience</h2>
        
        {/* Interactive Timeline */}
        <div className="exp-animate mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">My Journey</h3>
          <InteractiveTimeline />
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Frontend Development */}
          <TiltCard>
            <div className="exp-animate bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-center">Frontend Development</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {frontendSkills.map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-medium">{skill.name}</h4>
                      <p className="text-muted-foreground">{skill.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
          
          {/* Machine Learning / Data Science */}
          <TiltCard>
            <div className="exp-animate bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-center">Machine Learning | Data Science</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {mlSkills.map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-medium">{skill.name}</h4>
                      <p className="text-muted-foreground">{skill.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
        
        {/* 3D Skills Visualization */}
        <div className="exp-animate w-full h-80 perspective flex justify-center items-center mt-16">
          <SkillSphere skills={allSkills} />
        </div>
      </div>
      
      {/* Navigation Arrow */}
      <div className="exp-animate absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
        <a 
          href="#projects" 
          onClick={(e) => {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to Projects section"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
