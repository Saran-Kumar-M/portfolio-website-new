import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/hooks/use-theme';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  element: HTMLDivElement;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear any existing particles
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    particlesRef.current = [];
    
    // Setup
    const isDark = theme === 'dark';
    const particleColors = isDark 
      ? ['#4361ee30', '#3a0ca330', '#7209b730', '#4cc9f030'] 
      : ['#4361ee20', '#3a0ca320', '#7209b720', '#4cc9f020'];
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const particleCount = Math.min(Math.floor(width * height / 12000), 100); // Responsive count, max 100
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(container, particleColors, width, height);
    }
    
    // Animation loop
    const animate = () => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check - wrap around
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;
        
        // Apply new position
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      particlesRef.current.forEach(particle => {
        // Calculate distance from mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) { // Interaction radius
          // Repel particles from cursor
          const angle = Math.atan2(dy, dx);
          const force = (120 - distance) / 120; // Stronger force when closer
          
          particle.speedX -= Math.cos(angle) * force * 0.2;
          particle.speedY -= Math.sin(angle) * force * 0.2;
          
          // Limit speed
          const maxSpeed = 2;
          const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
          }
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Window resize handler
    const handleResize = () => {
      // Clear and recreate particles on resize
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      particlesRef.current = [];
      
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const newParticleCount = Math.min(Math.floor(newWidth * newHeight / 12000), 100);
      
      for (let i = 0; i < newParticleCount; i++) {
        createParticle(container, particleColors, newWidth, newHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);
  
  // Helper to create a particle
  const createParticle = (container: HTMLDivElement, colors: string[], width: number, height: number) => {
    const element = document.createElement('div');
    element.classList.add('particle');
    
    const size = Math.random() * 10 + 5; // Size between 5-15px
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.borderRadius = '50%';
    element.style.opacity = (Math.random() * 0.4 + 0.1).toString(); // Opacity between 0.1-0.5
    
    const x = Math.random() * width;
    const y = Math.random() * height;
    element.style.transform = `translate(${x}px, ${y}px)`;
    
    // Set properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    element.style.backgroundColor = color;
    element.style.position = 'absolute';
    element.style.pointerEvents = 'none'; // Make sure it doesn't interfere with interactions
    
    container.appendChild(element);
    
    // Create particle object
    const particle: Particle = {
      x,
      y,
      size,
      speedX: Math.random() * 0.4 - 0.2, // Speed between -0.2 and 0.2
      speedY: Math.random() * 0.4 - 0.2,
      color,
      element
    };
    
    particlesRef.current.push(particle);
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    ></div>
  );
}