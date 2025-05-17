import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/hooks/use-theme";

interface SkillSphereProps {
  skills: string[];
  radius?: number;
  size?: number;
}

export default function SkillSphere({ 
  skills,
  radius = 120,
  size = 16,
}: SkillSphereProps) {
  const sphereRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!sphereRef.current) return;
    
    // Clear any existing skill items
    while (sphereRef.current.firstChild) {
      sphereRef.current.removeChild(sphereRef.current.firstChild);
    }
    
    // Define dynamic color palette
    const colorPalette = theme === "dark" 
      ? ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#3b82f6', '#14b8a6', '#f97316'] // Vibrant colors for dark mode
      : ['#4338ca', '#7c3aed', '#be185d', '#dc2626', '#1d4ed8', '#0d9488', '#ea580c']; // Deeper colors for light mode
    
    // Create skill items positioned in 3D space
    skills.forEach((skill, i) => {
      const skillItem = document.createElement("div");
      skillItem.classList.add("skill-item");
      skillItem.textContent = skill;
      
      // Position in 3D space using spherical coordinates
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      skillItem.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      skillItem.style.fontSize = `${size}px`;
      
      // Apply color palette based on index
      const colorIndex = i % colorPalette.length;
      const baseColor = colorPalette[colorIndex];
      
      // Set initial styles with background gradient
      skillItem.style.background = `linear-gradient(45deg, ${baseColor}20, ${baseColor}40)`;
      skillItem.style.border = `1px solid ${baseColor}30`;
      skillItem.style.color = theme === "dark" ? "#ffffff" : "#000000";
      skillItem.style.boxShadow = `0 0 10px ${baseColor}20`;
      
      // Add hover effect
      skillItem.addEventListener("mouseenter", () => {
        gsap.to(skillItem, {
          scale: 1.4,
          duration: 0.3,
          background: `linear-gradient(45deg, ${baseColor}40, ${baseColor}60)`,
          color: "#ffffff",
          fontWeight: "bold",
          boxShadow: `0 0 20px ${baseColor}40, 0 0 40px ${baseColor}20`,
          zIndex: 10
        });
        
        // Create particle explosion effect on hover
        createParticleExplosion(skillItem, baseColor);
      });
      
      skillItem.addEventListener("mouseleave", () => {
        gsap.to(skillItem, {
          scale: 1,
          duration: 0.3,
          background: `linear-gradient(45deg, ${baseColor}20, ${baseColor}40)`,
          color: theme === "dark" ? "#ffffff" : "#000000",
          fontWeight: "normal",
          boxShadow: `0 0 10px ${baseColor}20`,
          zIndex: 1
        });
      });
      
      sphereRef.current.appendChild(skillItem);
    });
    
    // Create particle explosion effect
    const createParticleExplosion = (element: HTMLElement, color: string) => {
      if (!sphereRef.current) return;
      
      const rect = element.getBoundingClientRect();
      const sphereRect = sphereRef.current.getBoundingClientRect();
      
      // Center point relative to the sphere
      const centerX = rect.left + rect.width / 2 - sphereRect.left;
      const centerY = rect.top + rect.height / 2 - sphereRect.top;
      
      // Create particles
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full pointer-events-none';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = color;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.opacity = '0.8';
        
        sphereRef.current.appendChild(particle);
        
        // Random direction for particle
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const duration = 0.5 + Math.random() * 0.5;
        
        gsap.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: duration,
          onComplete: () => {
            if (sphereRef.current && sphereRef.current.contains(particle)) {
              sphereRef.current.removeChild(particle);
            }
          }
        });
      }
    };
    
    // Add interactive rotation on mousemove with gyroscopic effect
    let momentum = { x: 0, y: 0 };
    let lastMousePosition = { x: 0, y: 0 };
    let isMoving = false;
    let animationFrame: number;
    
    const updateSphereRotation = () => {
      if (!sphereRef.current) return;
      
      // Apply momentum with damping
      momentum.x *= 0.95;
      momentum.y *= 0.95;
      
      if (Math.abs(momentum.x) < 0.01 && Math.abs(momentum.y) < 0.01) {
        cancelAnimationFrame(animationFrame);
        isMoving = false;
        return;
      }
      
      gsap.to(sphereRef.current, {
        rotationY: `+=${momentum.x}`,
        rotationX: `+=${-momentum.y}`,
        duration: 0.1,
        ease: "power1.out",
      });
      
      animationFrame = requestAnimationFrame(updateSphereRotation);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sphereRef.current) return;
      
      const { clientX, clientY } = e;
      
      if (lastMousePosition.x === 0 && lastMousePosition.y === 0) {
        lastMousePosition = { x: clientX, y: clientY };
        return;
      }
      
      // Calculate mouse movement delta
      const deltaX = clientX - lastMousePosition.x;
      const deltaY = clientY - lastMousePosition.y;
      
      // Update momentum
      momentum.x = deltaX * 0.2;
      momentum.y = deltaY * 0.2;
      
      lastMousePosition = { x: clientX, y: clientY };
      
      // Start animation if not already running
      if (!isMoving) {
        isMoving = true;
        animationFrame = requestAnimationFrame(updateSphereRotation);
      }
    };
    
    const handleMouseLeave = () => {
      lastMousePosition = { x: 0, y: 0 };
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    sphereRef.current.addEventListener("mouseleave", handleMouseLeave);
    
    // Automatic slow rotation when not interacting
    const autoRotate = gsap.to(sphereRef.current, {
      rotationY: 360,
      duration: 60,
      repeat: -1,
      ease: "none"
    });
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (sphereRef.current) {
        sphereRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrame);
      autoRotate.kill();
    };
  }, [skills, radius, size, theme]);

  return (
    <div ref={sphereRef} className="skill-sphere w-full h-full relative overflow-visible"></div>
  );
}
