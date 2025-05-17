import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Send, Linkedin, Github, Instagram } from "lucide-react";
import { gsap } from "gsap";
import PageTransition from "@/components/layout/PageTransition";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Setup GSAP animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    tl.from(".hero-animate", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.5
    });
    
    // Background floating elements
    gsap.to(".float-bg-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });
    
    // Setup parallax effect on scroll
    const handleParallax = () => {
      const scrollY = window.scrollY;
      
      if (profilePicRef.current) {
        gsap.to(profilePicRef.current, {
          y: scrollY * 0.05,
          duration: 0.6
        });
      }
      
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: scrollY * 0.03,
          duration: 0.6
        });
      }
    };
    
    window.addEventListener("scroll", handleParallax);
    
    return () => {
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  return (
    <PageTransition id="profile">
      <section 
        id="profile" 
        ref={containerRef}
        className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-24 perspective overflow-hidden pt-20 md:pt-0"
      >
        {/* 3D Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="float-bg-element absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-primary/10 opacity-20"></div>
          <div className="float-bg-element absolute top-3/4 left-3/4 w-60 h-60 rounded-full bg-purple-500/10 opacity-20" style={{ animationDelay: "-2s" }}></div>
          <div className="float-bg-element absolute top-1/2 left-1/6 w-20 h-20 rounded-full bg-green-500/10 opacity-20" style={{ animationDelay: "-3s" }}></div>
          <div className="float-bg-element absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-red-500/10 opacity-20" style={{ animationDelay: "-1.5s" }}></div>
        </div>

        {/* Profile Picture with 3D Animation */}
        <div 
          ref={profilePicRef}
          className="hero-animate profile-pic-container relative w-64 h-64 md:w-80 md:h-80 mb-10 md:mb-0 md:mr-16 perspective preserve-3d"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-muted transform transition-all duration-500 hover:scale-105 shadow-xl">
            <svg 
              className="w-full h-full text-primary" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
                fill="currentColor" 
                fillOpacity="0.2"
              />
              <path 
                d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" 
                fill="currentColor" 
                fillOpacity="0.2"
              />
            </svg>
          </div>
          
          {/* Float effect circles */}
          <div className="absolute -top-6 -right-4 w-12 h-12 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: "3s" }}></div>
          <div className="absolute -bottom-2 -left-3 w-8 h-8 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: "3s", animationDelay: "-1s" }}></div>
        </div>
        
        {/* Profile Text with 3D Parallax */}
        <div 
          ref={contentRef}
          className="hero-animate profile-content max-w-lg text-center md:text-left preserve-3d"
        >
          <p className="hero-animate text-xl font-semibold mb-2 text-muted-foreground">Hello, I'm</p>
          <h1 className="hero-animate text-4xl md:text-5xl font-bold mb-3 transform transition-all duration-500">Tony Saran</h1>
          <p className="hero-animate text-xl md:text-2xl mb-8 text-muted-foreground">
            Machine Learning Engineer & Data Scientist & Web Developer
          </p>
          
          <div className="hero-animate flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full hover:scale-105 transition-transform"
              onClick={() => window.open('./assets/SaranResume.pdf')}
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="rounded-full hover:scale-105 transition-transform"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Send className="mr-2 h-4 w-4" /> Contact Info
            </Button>
          </div>
          
          <div className="hero-animate flex justify-center md:justify-start gap-6">
            <a 
              href="https://www.linkedin.com/in/saran-kumar-m-0874b3234/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-125 hover:text-primary"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/SaranKumar2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-125 hover:text-primary"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://www.instagram.com/tony_saran_jr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-125 hover:text-primary"
              aria-label="Instagram Profile"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-animate absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </section>
    </PageTransition>
  );
}
