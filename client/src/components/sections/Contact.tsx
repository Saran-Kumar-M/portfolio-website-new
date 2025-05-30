import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronUp,
  Send,
  User,
  Mail,
  Coffee,
  MessageSquare,
  Phone,
  Github,
  Linkedin,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/hooks/use-toast";
import TiltCard from "@/components/3d/TiltCard";
import PageTransition from "@/components/layout/PageTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    const elements = section.querySelectorAll(".contact-animate");

    elements.forEach((el) => {
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
        animation: gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }),
      });
      triggers.push(scrollTriggerInstance);
    });

    const floatAnimation = gsap.to(".contact-float", {
      y: -15,
      x: 5,
      rotate: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    return () => {
      floatAnimation.kill();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <PageTransition id="contact">
      <section
        id="contact"
        ref={sectionRef}
        className="relative min-h-screen py-20 px-6 md:px-16 lg:px-24 perspective"
      >
        <div className="max-w-3xl mx-auto">
          <p className="contact-animate text-center text-lg font-semibold text-primary mb-2">
            Get in Touch
          </p>
          <h2 className="contact-animate text-center text-4xl font-bold mb-16">
            Contact Me
          </h2>

          <div className="contact-animate mb-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 bg-card/70 backdrop-blur-lg rounded-2xl border border-border shadow-xl">
            <a
              href="tel:+919976522064"
              className="flex flex-col items-center gap-3 text-foreground cursor-pointer group
                rounded-xl p-6 bg-background/50 hover:bg-background/80 transition-all duration-300
                shadow-md sm:shadow-none sm:p-4
                ring-offset-background hover:ring-2 hover:ring-primary hover:ring-offset-2"
              aria-label="Call Phone Number"
            >
              <Phone className="h-12 w-12 sm:h-10 sm:w-10 text-primary group-hover:scale-110 group-hover:animate-pulse transition-all duration-300" />
              <span className="text-2xl font-semibold sm:text-xl text-primary">
                Phone
              </span>
              <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors sm:text-sm">
                +91 99765-22064
              </span>
            </a>

            <a
              href="mailto:tonysaran80@email.com"
              className="flex flex-col items-center gap-3 text-foreground cursor-pointer group
                rounded-xl p-6 bg-background/50 hover:bg-background/80 transition-all duration-300
                shadow-md sm:shadow-none sm:p-4
                ring-offset-background hover:ring-2 hover:ring-accent hover:ring-offset-2"
              aria-label="Send Email"
            >
              <Mail className="h-12 w-12 sm:h-10 sm:w-10 text-accent group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
              <span className="text-2xl font-semibold sm:text-xl text-accent">
                Email
              </span>
              <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors sm:text-sm">
                tonysaran80@email.com
              </span>
            </a>

            <div
              className="flex flex-col items-center gap-3 text-foreground cursor-pointer group
              rounded-xl p-6 bg-background/50 hover:bg-background/80 transition-all duration-300
              shadow-md sm:shadow-none sm:p-4
              ring-offset-background hover:ring-2 hover:ring-accent hover:ring-offset-2"
              aria-label="Social Links"
            >
              <Coffee className="h-12 w-12 sm:h-10 sm:w-10 text-accent group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" />
              <span className="text-2xl font-semibold sm:text-xl text-accent">
                Social
              </span>
              <div className="flex gap-10 text-4xl sm:text-3xl">
                <a
                  href="https://github.com/Saran-Kumar-M"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Github className="group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saran-kumar-m-0874b3234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Linkedin className="group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* New text added here */}
          <p className="contact-animate text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Fill out the form below
            and I'll get back to you as soon as possible!
          </p>
          {/* End of new text */}

          <TiltCard maxTilt={5}>
            <div
              className="contact-animate relative bg-card rounded-xl p-8 md:p-10 shadow-2xl border border-border
                transform-gpu transition-all duration-500 overflow-hidden
                hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:border-primary"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="contact-float absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/10 backdrop-blur-xl opacity-60 filter blur-3xl" />
              <div className="contact-float absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 backdrop-blur-xl opacity-50 filter blur-3xl" />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 relative z-10"
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center w-8 h-8">
                            <User className="h-5 w-5" />
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter your name"
                              className="w-full pl-12 pr-4 py-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300 border border-muted"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center w-8 h-8">
                            <Mail className="h-5 w-5" />
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              className="w-full pl-12 pr-4 py-4 rounded-lg bg-muted focus:ring-2 focus:ring-accent transition-all duration-300 border border-muted"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <div className="absolute left-3 top-4 text-muted-foreground flex items-center justify-center w-8 h-8">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Write your message"
                              rows={5}
                              className="w-full pl-12 pr-4 py-4 rounded-lg bg-muted focus:ring-2 focus:ring-accent transition-all duration-300 border border-muted resize-none"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-lg flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark active:scale-95 transition-transform duration-300"
                  >
                    Send Message
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </div>
          </TiltCard>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-10 right-10 z-50 rounded-full bg-primary p-3 shadow-lg hover:bg-primary-dark active:scale-90 transition-transform duration-300"
          >
            <ChevronUp className="h-6 w-6 text-white" />
          </button>
        </div>
      </section>
    </PageTransition>
  );
}
