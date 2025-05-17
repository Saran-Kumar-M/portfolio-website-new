import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ChevronDown } from "lucide-react";
import TiltCard from "@/components/3d/TiltCard";
import PageTransition from "@/components/layout/PageTransition";
import Interactive3DModel from "@/components/3d/Interactive3DModel";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Setup GSAP animations with ScrollTrigger
    const elements = section.querySelectorAll(".about-animate");
    
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
    
    // Float effect for decorative elements
    gsap.to(".about-float", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3
    });
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <PageTransition id="about">
      <section 
        id="about" 
        ref={sectionRef}
        className="relative min-h-screen py-20 px-6 md:px-16 lg:px-24 perspective"
      >
        <div className="max-w-6xl mx-auto">
          <p className="about-animate text-center text-lg font-semibold text-primary mb-2">Get To Know More</p>
          <h2 className="about-animate text-center text-4xl font-bold mb-16">About Me</h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 perspective">
            {/* 3D Interactive Model */}
            <div 
              ref={imgContainerRef}
              className="about-animate about-image-container w-full max-w-md lg:w-1/2 perspective preserve-3d"
            >
              <TiltCard>
                <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden border-2 border-muted shadow-xl transform transition-transform duration-500 hover:shadow-2xl bg-card">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full p-8">
                      {/* Dynamic 3D Model */}
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Interactive3DModel modelType="brain" size={2.5} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive instruction hint */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-center text-muted-foreground bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    Drag to rotate | Hover to interact
                  </div>
                  
                  {/* 3D floating elements for added depth */}
                  <div className="about-float absolute -top-5 -right-5 w-24 h-24 bg-primary/10 rounded-full"></div>
                  <div className="about-float absolute -bottom-6 -left-6 w-16 h-16 bg-green-500/10 rounded-full" style={{ animationDelay: "-2s" }}></div>
                </div>
              </TiltCard>
            </div>
            
            {/* About Details */}
            <div className="w-full lg:w-1/2 space-y-8">
              {/* Experience & Education Containers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience Card */}
                <TiltCard>
                  <div className="about-animate bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="text-primary h-6 w-6 mr-3" />
                      <h3 className="text-xl font-semibold">Experience</h3>
                    </div>
                    <p className="text-muted-foreground">
                      4 months<br />
                      Frontend Development<br />
                      Xebia
                    </p>
                  </div>
                </TiltCard>
                
                {/* Education Card */}
                <TiltCard>
                  <div className="about-animate bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="text-primary h-6 w-6 mr-3" />
                      <h3 className="text-xl font-semibold">Education</h3>
                    </div>
                    <p className="text-muted-foreground">
                      B.Tech Bachelors Degree<br />
                      Artificial Intelligence and Data Science
                    </p>
                  </div>
                </TiltCard>
              </div>
              
              {/* Bio Text */}
              <div className="about-animate bg-card rounded-xl p-6 shadow-lg border border-border">
                <p className="text-muted-foreground leading-relaxed">
                  As an AI and data science student, I'm passionate about crafting machine learning models and exploring the 
                  depths of data analytics. From predictive algorithms to natural language processing, I thrive on pushing the 
                  boundaries of innovation in this dynamic field. My goal is to create intelligent systems that drive progress 
                  and make a meaningful impact on society.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrow */}
        <div className="about-animate absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
          <a 
            href="#experience" 
            onClick={(e) => {
              e.preventDefault();
              const experienceSection = document.getElementById('experience');
              if (experienceSection) experienceSection.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll to Experience section"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" />
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
