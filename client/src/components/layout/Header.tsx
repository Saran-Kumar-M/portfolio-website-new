import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = theme === "dark";
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle navigation click and close mobile menu
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Direct theme toggling without relying on Switch component state
  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-3" : "py-5"
      }`}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-2xl md:text-3xl font-semibold">Tony Saran</div>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 text-lg">
            <li>
              <button onClick={() => handleNavClick("about")} className="nav-link">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("experience")} className="nav-link">
                Experience
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("projects")} className="nav-link">
                Projects
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("contact")} className="nav-link">
                Contact
              </button>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className="flex md:hidden justify-between items-center px-4">
        <div className="text-2xl font-semibold">Tony Saran</div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 rounded-md focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t border-border z-50">
          <ul className="flex flex-col py-2">
            <li>
              <button
                onClick={() => handleNavClick("about")}
                className="block w-full text-left px-6 py-3 hover:bg-muted transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("experience")}
                className="block w-full text-left px-6 py-3 hover:bg-muted transition-colors"
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("projects")}
                className="block w-full text-left px-6 py-3 hover:bg-muted transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick("contact")}
                className="block w-full text-left px-6 py-3 hover:bg-muted transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
