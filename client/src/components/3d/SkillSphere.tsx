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
      
      // Add hover effect
      skillItem.addEventListener("mouseenter", () => {
        gsap.to(skillItem, {
          scale: 1.3,
          duration: 0.3,
          backgroundColor: "rgba(0, 113, 255, 0.3)",
          color: theme === "dark" ? "#ffffff" : "#000000",
          fontWeight: "bold",
        });
      });
      
      skillItem.addEventListener("mouseleave", () => {
        gsap.to(skillItem, {
          scale: 1,
          duration: 0.3,
          backgroundColor: "rgba(0, 113, 255, 0.1)",
          color: theme === "dark" ? "#e0e0e0" : "#333333",
          fontWeight: "normal",
        });
      });
      
      sphereRef.current.appendChild(skillItem);
    });
    
    // Add interactive rotation on mousemove
    const handleMouseMove = (e: MouseEvent) => {
      if (!sphereRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = sphereRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      gsap.to(sphereRef.current, {
        rotationY: x * 30,
        rotationX: -y * 30,
        duration: 1,
        ease: "power2.out",
      });
    };
    
    const handleMouseLeave = () => {
      if (!sphereRef.current) return;
      
      gsap.to(sphereRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power2.out",
      });
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    sphereRef.current.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (sphereRef.current) {
        sphereRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [skills, radius, size, theme]);

  return (
    <div ref={sphereRef} className="skill-sphere w-full h-full"></div>
  );
}
