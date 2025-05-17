import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
  id: string;
}

export default function PageTransition({ children, id }: PageTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;
    
    // Set initial state - section is hidden, overlay is visible
    gsap.set(section, { autoAlpha: 0 });
    gsap.set(overlay, { 
      autoAlpha: 1,
      scaleY: 1,
      transformOrigin: 'bottom'
    });
    
    // Create animation timeline
    const tl = gsap.timeline();
    
    // Animate overlay out
    tl.to(overlay, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.6,
      ease: 'power2.inOut'
    });
    
    // Fade in content
    tl.to(section, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, "-=0.3");
    
    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);
  
  // Get background and text colors based on section id
  const getColors = () => {
    switch(id) {
      case 'profile':
        return { bg: 'bg-primary', textFrom: 'from-primary', textTo: 'to-primary-foreground' };
      case 'about':
        return { bg: 'bg-purple-500', textFrom: 'from-purple-500', textTo: 'to-pink-300' };
      case 'experience':
        return { bg: 'bg-blue-500', textFrom: 'from-blue-500', textTo: 'to-cyan-300' };
      case 'projects':
        return { bg: 'bg-green-500', textFrom: 'from-green-500', textTo: 'to-emerald-300' };
      case 'contact':
        return { bg: 'bg-amber-500', textFrom: 'from-amber-500', textTo: 'to-yellow-300' };
      default:
        return { bg: 'bg-primary', textFrom: 'from-primary', textTo: 'to-primary-foreground' };
    }
  };
  
  const { bg } = getColors();
  
  return (
    <div className="relative">
      {/* Transition overlay - a colored screen that wipes away */}
      <div 
        ref={overlayRef}
        className={`fixed inset-0 ${bg} z-50 pointer-events-none`}
        aria-hidden="true"
      ></div>
      
      {/* The actual content */}
      <div 
        ref={sectionRef}
        className="invisible"
      >
        {children}
      </div>
    </div>
  );
}