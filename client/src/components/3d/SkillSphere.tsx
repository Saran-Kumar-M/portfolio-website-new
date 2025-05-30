import React, { useRef, useEffect, useState, useCallback } from "react";

interface SkillSphereProps {
  skills: string[];
  styleVariant?: "glassmorphism" | "neon" | "minimal" | "cyberpunk" | "organic";
}

const SkillSphere: React.FC<SkillSphereProps> = ({
  skills = [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Jupyter",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "Apache Spark",
    "Hadoop",
    "Kafka",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Data Visualization",
    "Tableau",
    "Power BI",
    "Plotly",
    "D3.js",
    "Statistics",
    "Neural Networks",
    "Computer Vision",
    "NLP",
    "OpenCV",
    "NLTK",
    "spaCy",
    "Transformers",
    "BERT",
    "GPT",
    "LangChain",
    "Hugging Face",
    "MLOps",
    "Git",
    "Linux",
    "Bash",
    "React",
    "TypeScript",
    "JavaScript",
    "FastAPI",
    "Flask",
    "Django",
    "REST APIs",
  ],
  styleVariant = "glassmorphism",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(styleVariant);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  const RADIUS = 200;

  const positions = skills.map((_, i) => {
    const y = 1 - (i / (skills.length - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;

    return {
      x: Math.cos(theta) * radiusAtY * RADIUS,
      y: y * RADIUS,
      z: Math.sin(theta) * radiusAtY * RADIUS,
    };
  });

  useEffect(() => {
    if (isDragging) return;

    const animate = () => {
      setRotation((prev) => ({
        ...prev,
        y: prev.y + 0.5,
      }));
      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMouse.current.x;

      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + deltaX * 0.5,
      }));

      lastMouse.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getSkillStyle = (skill: string, index: number) => {
    const baseClasses =
      "absolute p-3 px-5 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out hover:scale-110 cursor-pointer select-none";

    switch (currentStyle) {
      case "glassmorphism":
        return `${baseClasses} bg-white/10 backdrop-blur-md border border-white/20 text-gray-800 shadow-xl hover:bg-white/20 hover:border-white/30 rounded-full`;
      case "neon":
        const neonColors = [
          "border-cyan-400 text-cyan-300 shadow-cyan-400/50",
          "border-pink-400 text-pink-300 shadow-pink-400/50",
          "border-green-400 text-green-300 shadow-green-400/50",
          "border-yellow-400 text-yellow-300 shadow-yellow-400/50",
          "border-purple-400 text-purple-300 shadow-purple-400/50",
        ];
        const neonColor = neonColors[index % neonColors.length];
        return `${baseClasses} bg-black/80 border-2 ${neonColor} shadow-lg hover:shadow-xl hover:brightness-125 rounded-full`;

      case "minimal":
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-200 hover:shadow-md rounded-full`;

      case "cyberpunk":
        const cyberpunkColors = [
          "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
          "bg-gradient-to-r from-cyan-400 to-blue-500 text-black",
          "bg-gradient-to-r from-pink-400 to-red-500 text-white",
          "bg-gradient-to-r from-green-400 to-emerald-500 text-black",
        ];
        const cyberpunkColor = cyberpunkColors[index % cyberpunkColors.length];
        return `${baseClasses} ${cyberpunkColor} border-2 border-black shadow-lg transform hover:skew-x-0 rounded-full`;

      case "organic":
        const organicColors = [
          "bg-gradient-to-br from-green-200 to-green-400 text-green-900",
          "bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900",
          "bg-gradient-to-br from-purple-200 to-purple-400 text-purple-900",
          "bg-gradient-to-br from-pink-200 to-pink-400 text-pink-900",
          "bg-gradient-to-br from-yellow-200 to-yellow-400 text-yellow-900",
        ];
        const organicColor = organicColors[index % organicColors.length];
        return `${baseClasses} ${organicColor} border-0 shadow-lg hover:shadow-xl rounded-2xl`;

      default:
        return `${baseClasses} bg-gradient-to-br from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 border border-blue-400 hover:border-fuchsia-400 text-white shadow-lg rounded-full`;
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-visible rounded-xl bg-transparent">
      {/* Style Selector */}
      <div className="p-6 flex justify-center gap-6 flex-wrap z-10">
        {["glassmorphism", "neon", "minimal", "cyberpunk", "organic"].map(
          (style) => (
            <button
              key={style}
              onClick={() => setCurrentStyle(style as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentStyle === style
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Sphere Container */}
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: "1000px",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            {skills.map((skill, index) => {
              const pos = positions[index];

              const rotX = (rotation.x * Math.PI) / 180;
              const rotY = (rotation.y * Math.PI) / 180;

              const transformedZ =
                pos.z * Math.cos(rotY) - pos.x * Math.sin(rotY);
              const transformedX =
                pos.z * Math.sin(rotY) + pos.x * Math.cos(rotY);
              const finalZ =
                transformedZ * Math.cos(rotX) - pos.y * Math.sin(rotX);
              const finalY =
                transformedZ * Math.sin(rotX) + pos.y * Math.cos(rotX);

              const scale = Math.max(
                0.4,
                Math.min(1.2, ((finalZ + RADIUS) / (2 * RADIUS)) * 0.8 + 0.4)
              );
              const opacity = Math.max(
                0.2,
                Math.min(1, ((finalZ + RADIUS) / (2 * RADIUS)) * 0.9 + 0.1)
              );

              const labelRotationY = -rotation.y;
              const labelRotationX = -rotation.x;

              return (
                <div
                  key={`${skill}-${index}`}
                  className={getSkillStyle(skill, index)}
                  style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) rotateX(${labelRotationX}deg) rotateY(${labelRotationY}deg) scale(${scale})`,
                    opacity: opacity,
                    transformOrigin: "center center",
                    zIndex: Math.round(finalZ + RADIUS),
                    backfaceVisibility: "visible",
                  }}
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 px-4 pb-4 pt-2 text-center text-sm text-foreground/70 space-y-1">
        <div>
          {currentStyle === "glassmorphism" &&
            "Glassmorphism: translucent surfaces with blur"}
          {currentStyle === "neon" && "Neon: glowing effects and vivid colors"}
          {currentStyle === "minimal" &&
            "Minimal: clean layout with neutral tones"}
          {currentStyle === "cyberpunk" &&
            "Cyberpunk: edgy gradients with bold shadows"}
          {currentStyle === "organic" &&
            "Organic: soft tones inspired by nature"}
        </div>
        <div className="text-xs text-foreground/50">
          Drag to rotate • Auto-rotates when idle
        </div>
      </div>
    </div>
  );
};

export default SkillSphere;
