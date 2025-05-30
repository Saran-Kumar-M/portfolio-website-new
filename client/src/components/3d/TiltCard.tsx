import { useEffect, useRef, ReactNode } from "react";
import VanillaTilt from "vanilla-tilt";

interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export default function TiltCard({
  children,
  maxTilt = 10,
  scale = 1.05,
  perspective = 1000,
  speed = 300,
  glare = false,
  maxGlare = 0.5,
}: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!tiltRef.current) return;
    
    // Initialize vanilla-tilt
    const tiltNode = tiltRef.current;
    
    VanillaTilt.init(tiltNode, {
      max: maxTilt,
      scale,
      perspective,
      speed,
      glare,
      gyroscope: true, // Enable gyroscope for mobile devices
    });
    
    // Cleanup
    return () => {
      // @ts-ignore - vanilla-tilt adds a vanillaTilt property to the element
      if (tiltNode.vanillaTilt) {
        // @ts-ignore
        tiltNode.vanillaTilt.destroy();
      }
    };
  }, [maxTilt, scale, perspective, speed, glare, maxGlare]);

  return (
    <div ref={tiltRef} className="tilt-card">
      {children}
    </div>
  );
}
