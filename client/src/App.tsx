import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/not-found";
import ParticleBackground from "@/components/3d/ParticleBackground"; // import your particle bg

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import Three.js related libraries
    const loadLibraries = async () => {
      try {
        await Promise.all([
          import("three"),
          import("gsap"),
          import("vanilla-tilt"),
        ]);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load libraries:", error);
        setIsLoaded(true);
      }
    };

    loadLibraries();
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Global particle background rendered here */}
      <ParticleBackground />
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
