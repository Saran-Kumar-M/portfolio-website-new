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
  
  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };
  
  return { theme, toggleTheme };
};
