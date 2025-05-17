import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Briefcase, GraduationCap } from 'lucide-react';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Timeline event types
type TimelineEvent = {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: "education" | "work";
};

const timelineEvents: TimelineEvent[] = [
  {
    id: "work-1",
    title: "Frontend Development",
    organization: "Xebia",
    date: "2023 - Present",
    description: "Developing responsive web applications using modern frontend technologies and frameworks.",
    type: "work"
  },
  {
    id: "edu-1",
    title: "B.Tech in AI and Data Science",
    organization: "University",
    date: "2020 - 2024",
    description: "Specialized in artificial intelligence, machine learning, and data analysis techniques.",
    type: "education"
  },
  {
    id: "edu-2",
    title: "Data Science Certification",
    organization: "Online Platform",
    date: "2022",
    description: "Advanced certification in data analysis, visualization, and machine learning algorithms.",
    type: "education"
  },
  {
    id: "work-2",
    title: "ML Research Intern",
    organization: "Research Lab",
    date: "2022",
    description: "Conducted research on computer vision applications and contributed to open-source projects.",
    type: "work"
  }
];

export default function InteractiveTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Clear refs array
    eventsRef.current = [];

    // Animate timeline line drawing
    gsap.fromTo(
      ".timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timeline,
          start: "top 80%",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    // Animate each timeline item
    const events = timeline.querySelectorAll(".timeline-event");
    
    events.forEach((event, index) => {
      // Store reference
      if (event instanceof HTMLDivElement) {
        eventsRef.current.push(event);
      }
      
      // Create animation for each event
      gsap.fromTo(
        event,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50, // Alternate side animation
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: event,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
      
      // Animate the connector
      const connector = event.querySelector(".timeline-connector");
      if (connector) {
        gsap.fromTo(
          connector,
          { width: 0 },
          {
            width: "100%",
            duration: 0.4,
            delay: 0.3,
            scrollTrigger: {
              trigger: event,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }
      
      // Animate the icon
      const icon = event.querySelector(".timeline-icon");
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -45 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: event,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 perspective" ref={timelineRef}>
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2 timeline-line"></div>
      
      {/* Timeline events */}
      <div className="relative z-10">
        {timelineEvents.map((event, index) => (
          <div 
            key={event.id}
            className={`timeline-event relative my-12 grid grid-cols-12 gap-6 opacity-0 ${
              index % 2 === 0 ? "left-event" : "right-event"
            }`}
          >
            {/* For left-side events */}
            {index % 2 === 0 && (
              <>
                <div className="col-span-5 md:col-span-5 text-right">
                  <div className="bg-card border border-border p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="mb-2 flex flex-col items-end">
                      <h3 className="text-lg md:text-xl font-semibold">{event.title}</h3>
                      <span className="text-sm text-muted-foreground">{event.organization}</span>
                    </div>
                    <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2">{event.date}</div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <div className="h-0.5 w-1/2 bg-primary/30 mr-1 timeline-connector"></div>
                  <div className={`timeline-icon flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${
                    event.type === "education" ? "bg-purple-500/90" : "bg-primary/90"
                  } shadow-md z-10`}>
                    {event.type === "education" ? (
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </div>
                  <div className="h-0.5 w-0 bg-transparent"></div>
                </div>
                <div className="col-span-5 md:col-span-5"></div>
              </>
            )}
            
            {/* For right-side events */}
            {index % 2 !== 0 && (
              <>
                <div className="col-span-5 md:col-span-5"></div>
                <div className="col-span-2 flex justify-center items-center">
                  <div className="h-0.5 w-0 bg-transparent"></div>
                  <div className={`timeline-icon flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${
                    event.type === "education" ? "bg-purple-500/90" : "bg-primary/90"
                  } shadow-md z-10`}>
                    {event.type === "education" ? (
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </div>
                  <div className="h-0.5 w-1/2 bg-primary/30 ml-1 timeline-connector"></div>
                </div>
                <div className="col-span-5 md:col-span-5">
                  <div className="bg-card border border-border p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="mb-2">
                      <h3 className="text-lg md:text-xl font-semibold">{event.title}</h3>
                      <span className="text-sm text-muted-foreground">{event.organization}</span>
                    </div>
                    <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2">{event.date}</div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}