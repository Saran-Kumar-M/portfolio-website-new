import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorFollower() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const colors = [
      "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
      "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
      "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060"
    ];
    
    // Create cursor circles
    for (let i = 0; i < 15; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.backgroundColor = colors[i % colors.length];
      circle.style.transform = `translateZ(-${i * 5}px)`;
      containerRef.current.appendChild(circle);
    }
    
    // Track mouse movement and animate circles
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");
    
    const updateCoords = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };
    
    window.addEventListener("mousemove", updateCoords);
    
    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;
      
   
      circles.forEach((circle, index) => {
        (circle as HTMLElement).style.left = x - 12 + "px";
        (circle as HTMLElement).style.top = y - 12 + "px";
        
        (circle as HTMLElement).style.scale = `${(circles.length - index) / circles.length}`;
        
        const nextCircle = circles[index + 1] || circles[0];
        const nextCirclePos = { 
          x: nextCircle ? parseFloat((nextCircle as HTMLElement).style.left || "0") + 12 : x,
          y: nextCircle ? parseFloat((nextCircle as HTMLElement).style.top || "0") + 12 : y
        };
        
        x += (nextCirclePos.x - x) * 0.3;
        y += (nextCirclePos.y - y) * 0.3;
      });
      requestAnimationFrame(animateCircles);
    };
    
    const animationId = requestAnimationFrame(animateCircles);
    
    return () => {
      window.removeEventListener("mousemove", updateCoords);
      cancelAnimationFrame(animationId);
      
      // Clean up circles
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      id="cursor-container"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    ></div>
  );
}
