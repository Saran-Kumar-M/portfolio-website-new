import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";

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
    description:
      "Developing responsive web applications using modern frontend technologies and frameworks.",
    type: "work",
  },
  {
    id: "edu-1",
    title: "B.Tech in AI and Data Science",
    organization: "University",
    date: "2024",
    description:
      "Specialized in artificial intelligence, machine learning, and data analysis techniques.",
    type: "education",
  },
  {
    id: "edu-2",
    title: "Data Science Certification",
    organization: "Online Platform",
    date: "2022",
    description:
      "Advanced certification in data analysis, visualization, and machine learning algorithms.",
    type: "education",
  },
  {
    id: "work-2",
    title: "ML Research Intern",
    organization: "Research Lab",
    date: "2022",
    description:
      "Conducted research on computer vision applications and contributed to open-source projects.",
    type: "work",
  },
  {
    id: "edu-3",
    title: "High School Diploma",
    organization: "School Name",
    date: "2019",
    description: "Completed secondary education with focus on STEM subjects.",
    type: "education",
  },
];

export default function InteractiveTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timelineContainer = timelineRef.current;
    const contentContainer = contentRef.current;

    if (!timelineContainer || !contentContainer) {
      console.warn(
        "InteractiveTimeline: Timeline container or content container not found."
      );
      return;
    }

    const line =
      timelineContainer.querySelector<HTMLDivElement>(".timeline-line");
    if (!line) {
      console.warn("InteractiveTimeline: Timeline line element not found.");
      return;
    }

    // Set initial state for the line
    gsap.set(line, { scaleY: 0, transformOrigin: "top" });

    // Animate timeline line drawing using scaleY
    gsap.to(line, {
      scaleY: 1,
      ease: "none", // 'none' for smooth scrubbing effect
      scrollTrigger: {
        trigger: contentContainer,
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: false, // Set to true for debugging if needed
        id: "TimelineLine",
      },
    });

    // Animate each timeline item and its sub-elements for the "pop out" effect
    const events = contentContainer.querySelectorAll(".timeline-event");

    events.forEach((event, index) => {
      // Select the direct children of .timeline-card-inner for staggered animation
      const cardContentElements = gsap.utils.toArray(
        event.querySelectorAll(
          ".timeline-card-inner > *:not(.timeline-connector)"
        )
      ); // Exclude connector if it's somehow inside

      // Main animation for the card container (includes rotation)
      gsap.fromTo(
        event,
        {
          opacity: 0,
          y: 50, // Start slightly below
          scale: 0.8, // Start smaller for a pop effect
          rotationX: 30, // Initial rotation on X-axis (like flipping in)
          transformOrigin: "center center", // Origin for rotation
        },
        {
          opacity: 1,
          y: 0,
          scale: 1, // Pop to original size
          rotationX: 0, // End rotation
          duration: 0.8,
          ease: "back.out(1.7)", // A cool "pop" ease
          scrollTrigger: {
            trigger: event,
            start: "top 75%",
            toggleActions: "play none none none", // Play once when entering viewport
            // markers: true, // Uncomment for individual event markers debugging
            id: `Event-${index}`,
          },
        }
      );

      // Staggered reveal for content *inside* the card
      if (cardContentElements.length > 0) {
        gsap.fromTo(
          cardContentElements,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08, // Small stagger delay between each element
            ease: "power2.out",
            scrollTrigger: {
              trigger: event, // Trigger when the main card animates
              start: "top 70%", // Trigger slightly after the card starts
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animate the connector (the short horizontal line)
      const connector = event.querySelector(".timeline-connector");
      if (connector) {
        gsap.fromTo(
          connector,
          { width: 0, opacity: 0 }, // Start with opacity 0 too
          {
            width: "100%",
            opacity: 1,
            duration: 0.4,
            delay: 0.2, // Small delay after card starts to pop
            ease: "power2.out",
            scrollTrigger: {
              trigger: event,
              start: "top 75%", // Trigger at the same time as the card
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animate the icon (the circle with the icon)
      const icon = event.querySelector(".timeline-icon");
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -90, opacity: 0 }, // Start smaller, rotated, and invisible
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.4, // Delay further to appear after connector
            ease: "elastic.out(1, 0.5)", // More bouncy pop ease
            scrollTrigger: {
              trigger: event,
              start: "top 75%", // Trigger at the same time as the card
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
    };
  }, []);

  return (
    // The wrapper for the timeline, establishing relative positioning for the line
    <div className="relative w-full max-w-5xl mx-auto my-12" ref={timelineRef}>
      {/* Center line - Positioned absolutely relative to timelineRef */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2 timeline-line h-full transform-origin-top"></div>

      {/* Timeline events container - This is what defines the overall height of the timeline. */}
      {/* The main content that the line's scrolltrigger tracks */}
      <div className="relative z-10" ref={contentRef}>
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            // Keep opacity-0 here as initial state for GSAP for the main card container
            className={`timeline-event relative my-12 grid grid-cols-12 gap-6 opacity-0 ${
              index % 2 === 0 ? "left-event" : "right-event"
            }`}
          >
            {/* For left-side events */}
            {index % 2 === 0 && (
              <>
                <div className="col-span-5 md:col-span-5 text-right">
                  {/* Added timeline-card-inner for content, ensures its children are targeted for stagger */}
                  <div className="bg-card border border-border p-4 md:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-glow-primary hover:border-primary hover:-translate-y-2 timeline-card-inner">
                    {/* Added opacity-0 to direct children for staggered reveal */}
                    <div className="mb-2 flex flex-col items-end opacity-0">
                      <h3 className="text-lg md:text-xl font-semibold">
                        {event.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {event.organization}
                      </span>
                    </div>
                    <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2 opacity-0">
                      {event.date}
                    </div>
                    <p className="text-sm text-muted-foreground opacity-0">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  {/* Connector line for left events */}
                  <div className="h-0.5 w-1/2 bg-primary/30 mr-1 timeline-connector opacity-0"></div>
                  <div
                    className={`timeline-icon flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${
                      event.type === "education"
                        ? "bg-purple-500/90"
                        : "bg-primary/90"
                    } shadow-md z-10 opacity-0`}
                  >
                    {event.type === "education" ? (
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </div>
                  {/* Empty div for spacing (important for layout consistency) */}
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
                  {/* Empty div for spacing (important for layout consistency) */}
                  <div className="h-0.5 w-0 bg-transparent"></div>
                  <div
                    className={`timeline-icon flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${
                      event.type === "education"
                        ? "bg-purple-500/90"
                        : "bg-primary/90"
                    } shadow-md z-10 opacity-0`}
                  >
                    {event.type === "education" ? (
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </div>
                  {/* Connector line for right events */}
                  <div className="h-0.5 w-1/2 bg-primary/30 ml-1 timeline-connector opacity-0"></div>
                </div>
                <div className="col-span-5 md:col-span-5">
                  {/* Added timeline-card-inner for content, ensures its children are targeted for stagger */}
                  <div className="bg-card border border-border p-4 md:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-glow-primary hover:border-primary hover:-translate-y-2 timeline-card-inner">
                    {/* Added opacity-0 to direct children for staggered reveal */}
                    <div className="mb-2 opacity-0">
                      <h3 className="text-lg md:text-xl font-semibold">
                        {event.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {event.organization}
                      </span>
                    </div>
                    <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded mb-2 opacity-0">
                      {event.date}
                    </div>
                    <p className="text-sm text-muted-foreground opacity-0">
                      {event.description}
                    </p>
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
