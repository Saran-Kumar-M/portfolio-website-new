import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, ExternalLink } from "lucide-react";
import TiltCard from "@/components/3d/TiltCard";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Realtime Aircraft Marshalling Signals Detection",
    description: "An application that detects aircraft marshalling signals in real-time using computer vision and deep learning.",
    image: "aircraft-marshalling",
    githubLink: "https://github.com/your-github-link-1",
    demoLink: "https://live-demo-link-1.com"
  },
  {
    title: "Blood Pressure Predictor - Based on BMI, Age and Weight",
    description: "A machine learning model that predicts blood pressure based on BMI, age, and weight metrics.",
    image: "blood-pressure",
    githubLink: "https://github.com/your-github-link-2",
    demoLink: "https://live-demo-link-2.com"
  },
  {
    title: "Income Level Classification - Based on required inputs",
    description: "A classification model to predict income levels based on various demographic and employment factors.",
    image: "income-classification",
    githubLink: "https://github.com/your-github-link-3",
    demoLink: "https://live-demo-link-3.com"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Setup GSAP animations with ScrollTrigger
    const elements = section.querySelectorAll(".project-animate");
    
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
    
    // Project cards hover animation
    const projectCards = section.querySelectorAll(".project-card");
    
    projectCards.forEach(card => {
      card.addEventListener("mousemove", (e: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;
        
        const tiltAmount = 8; // Max tilt in degrees
        card.style.transform = `perspective(1000px) rotateY(${xPercent * tiltAmount}deg) rotateX(${-yPercent * tiltAmount}deg) translateZ(20px)`;
      });
      
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
      });
    });
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Generate an SVG placeholder with project name embedded
  const generateProjectSVG = (name: string) => {
    const colors = {
      "aircraft-marshalling": "#4a6baf",
      "blood-pressure": "#d35f5f",
      "income-classification": "#50a070"
    };
    
    const color = colors[name as keyof typeof colors] || "#6b7280";
    
    return (
      <svg 
        className="w-full h-full" 
        viewBox="0 0 800 500" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="800" height="500" fill={color} fillOpacity="0.2" />
        <path d="M0 0 L800 500 M800 0 L0 500" stroke={color} strokeOpacity="0.3" strokeWidth="2" />
        <text x="400" y="250" fontFamily="sans-serif" fontSize="24" fill={color} textAnchor="middle">
          {name.split('-').join(' ')}
        </text>
      </svg>
    );
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-16 lg:px-24 perspective"
    >
      <div className="max-w-6xl mx-auto">
        <p className="project-animate text-center text-lg font-semibold text-primary mb-2">Browse My Recent</p>
        <h2 className="project-animate text-center text-4xl font-bold mb-16">Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-animate project-card transform-gpu preserve-3d transition-all duration-500 rounded-xl overflow-hidden bg-card shadow-xl h-full"
            >
              <div className="relative h-56 overflow-hidden">
                {generateProjectSVG(project.image)}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{project.title}</h3>
                
                <div className="flex gap-3 mt-5">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(project.githubLink, "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" /> Github
                  </Button>
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => window.open(project.demoLink, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrow */}
      <div className="project-animate absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
        <a 
          href="#contact" 
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to Contact section"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
