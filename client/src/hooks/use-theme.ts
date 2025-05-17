import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    // Check localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme") as Theme | null;
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        return storedTheme;
      }
      
      // Check system preference
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        return "dark";
      }
    }
    
    // Default to light
    return "light";
  };
  
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Store in localStorage
    localStorage.setItem("theme", theme);
    
    // Also set data-theme attribute for components that use it
    document.body.setAttribute("data-theme", theme);
    
    // Ensure the correct class is applied
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  
  // Toggle between light and dark with animation
  const toggleTheme = (event?: React.MouseEvent<HTMLElement>) => {
    // Create ripple effect from click position
    if (event && typeof window !== "undefined") {
      const x = event.clientX;
      const y = event.clientY;
      
      // Calculate the largest dimension to ensure circle covers entire screen
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate distance to farthest corner
      const distanceToTopLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      const distanceToTopRight = Math.sqrt(Math.pow(windowWidth - x, 2) + Math.pow(y, 2));
      const distanceToBottomLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(windowHeight - y, 2));
      const distanceToBottomRight = Math.sqrt(Math.pow(windowWidth - x, 2) + Math.pow(windowHeight - y, 2));
      
      // Get maximum distance
      const maxDistance = Math.max(
        distanceToTopLeft,
        distanceToTopRight,
        distanceToBottomLeft,
        distanceToBottomRight
      );
      
      // Create and append circle element
      const circle = document.createElement("div");
      circle.classList.add("theme-transition-circle");
      
      // Set the new theme color for the circle
      const newTheme = theme === "light" ? "dark" : "light";
      circle.style.background = newTheme === "dark" ? "hsl(240, 10%, 3.9%)" : "hsl(0, 0%, 100%)";
      
      // Position circle at click coordinates
      circle.style.top = `${y}px`;
      circle.style.left = `${x}px`;
      
      // Initial size
      circle.style.width = "0";
      circle.style.height = "0";
      
      document.body.appendChild(circle);
      
      // Start animation after a short delay to ensure the element is in the DOM
      setTimeout(() => {
        // Target size with a bit of extra to ensure full coverage
        const finalSize = maxDistance * 2.5;
        circle.style.width = `${finalSize}px`;
        circle.style.height = `${finalSize}px`;
      }, 50);
      
      // After animation completes, remove the circle and apply the actual theme change
      setTimeout(() => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
        
        // Remove the circle after theme has changed
        setTimeout(() => {
          if (document.body.contains(circle)) {
            document.body.removeChild(circle);
          }
        }, 50);
      }, 400);
    } else {
      // Fallback if no event is provided (like during initialization)
      setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    }
  };
  
  return { theme, toggleTheme };
};
