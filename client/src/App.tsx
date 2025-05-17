import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/not-found";

// ThreeJS and related libraries are loaded dynamically to improve initial load time
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
        // Still set as loaded to show fallback experience
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
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
