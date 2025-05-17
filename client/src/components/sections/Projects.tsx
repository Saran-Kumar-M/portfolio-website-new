import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, ExternalLink, Code, BarChart, PanelLeftOpen } from "lucide-react";
import TiltCard from "@/components/3d/TiltCard";
import { Badge } from "@/components/ui/badge";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Realtime Aircraft Marshalling Signals Detection",
    description: "An application that detects aircraft marshalling signals in real-time using computer vision and deep learning techniques with YOLO object detection.",
    image: "aircraft-marshalling",
    tags: ["Computer Vision", "Python", "TensorFlow", "YOLO"],
    iconType: "ai",
    githubLink: "https://github.com/your-github-link-1",
    demoLink: "https://live-demo-link-1.com"
  },
  {
    title: "Blood Pressure Predictor",
    description: "A machine learning model that accurately predicts blood pressure based on BMI, age, weight and other health metrics with 94% accuracy.",
    image: "blood-pressure",
    tags: ["Machine Learning", "Python", "Scikit-learn", "Health"],
    iconType: "data",
    githubLink: "https://github.com/your-github-link-2",
    demoLink: "https://live-demo-link-2.com"
  },
  {
    title: "Income Level Classification System",
    description: "A classification model to predict income levels based on various demographic and employment factors using decision trees and random forests.",
    image: "income-classification",
    tags: ["Data Science", "Classification", "Python", "Pandas"],
    iconType: "code",
    githubLink: "https://github.com/your-github-link-3",
    demoLink: "https://live-demo-link-3.com"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
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
    
    // Project cards hover animation - using React state instead of direct DOM manipulation
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Generate a more sophisticated and themed SVG background for projects
  const generateProjectBackground = (name: string, iconType: string) => {
    const colors = {
      "aircraft-marshalling": "#4361ee",
      "blood-pressure": "#ef476f",
      "income-classification": "#06d6a0"
    };
    
    const baseColor = colors[name as keyof typeof colors] || "#6b7280";
    
    // Select icon based on project type
    const renderIcon = () => {
      switch(iconType) {
        case 'ai':
          return <PanelLeftOpen className="h-12 w-12 absolute top-4 right-4 opacity-20 text-white" />;
        case 'data':
          return <BarChart className="h-12 w-12 absolute top-4 right-4 opacity-20 text-white" />;
        case 'code':
          return <Code className="h-12 w-12 absolute top-4 right-4 opacity-20 text-white" />;
        default:
          return null;
      }
    };
    
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-opacity-80 to-opacity-100 overflow-hidden group" 
        style={{ 
          background: `linear-gradient(135deg, ${baseColor}90, ${baseColor})`
        }}
      >
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-20">
          <svg 
            className="w-full h-full" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.5" />
            <g fill="white" fillOpacity="0.3">
              <circle cx="20" cy="20" r="8" />
              <circle cx="80" cy="80" r="8" />
              <circle cx="80" cy="20" r="4" />
              <circle cx="20" cy="80" r="4" />
            </g>
          </svg>
        </div>
        
        {/* Project title overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-3">{name.split('-').join(' ')}</h3>
          </div>
        </div>
        
        {/* Icon */}
        {renderIcon()}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-white text-center">
            <p className="text-lg font-semibold">View Project</p>
          </div>
        </div>
      </div>
    );
  };

  const handleCardHover = (index: number | null) => {
    setHoveredCard(index);
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
            <TiltCard key={index} maxTilt={5} glare={true} maxGlare={0.1}>
              <div 
                className={`project-animate project-card relative transform-gpu transition-all duration-500 rounded-xl overflow-hidden bg-card shadow-xl h-full border border-border ${hoveredCard === index ? 'scale-[1.02] shadow-2xl z-10' : ''}`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                <div className="relative h-56 overflow-hidden">
                  {generateProjectBackground(project.image, project.iconType)}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      variant="outline" 
                      className="flex-1 group"
                      onClick={() => window.open(project.githubLink, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Github
                    </Button>
                    <Button 
                      variant="default" 
                      className="flex-1 group"
                      onClick={() => window.open(project.demoLink, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </TiltCard>
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
