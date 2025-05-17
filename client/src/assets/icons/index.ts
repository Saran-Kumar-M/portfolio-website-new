import { FC, SVGProps } from "react";

// SVG icons as React components to avoid using external images

export const ProfileIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    <path 
      d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
  </svg>
);

export const ProjectPlaceholder: FC<SVGProps<SVGSVGElement> & { name: string, color?: string }> = ({ name, color = "#6b7280", ...props }) => (
  <svg 
    viewBox="0 0 800 500" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="800" height="500" fill={color} fillOpacity="0.2" />
    <path d="M0 0 L800 500 M800 0 L0 500" stroke={color} strokeOpacity="0.3" strokeWidth="2" />
    <text x="400" y="250" fontFamily="sans-serif" fontSize="24" fill={color} textAnchor="middle">
      {name.split('-').join(' ')}
    </text>
  </svg>
);

export const CheckmarkIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
      fill="currentColor" 
      fillOpacity="0.1"
    />
    <path 
      d="M7.75 12.75L10.25 15.25L16.25 9.25" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const PatternBackground: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...props}
  >
    <rect width="100" height="100" fill="currentColor" fillOpacity="0.05" />
    <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
  </svg>
);
