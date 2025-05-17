import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronUp, Send, User, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import TiltCard from "@/components/3d/TiltCard";
import AnimatedForm from "@/components/ui/animated-form";
import PageTransition from "@/components/layout/PageTransition";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Form validation schema
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
  
  // Form definition
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
      // Here you would typically send the form data to a backend API
      // For now, we'll simulate a successful submission
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success toast
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
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
  
  // Handle form submission with animation wrapper
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return form.handleSubmit(onSubmit)();
  };
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Setup GSAP animations with ScrollTrigger
    const elements = section.querySelectorAll(".contact-animate");
    
    elements.forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
    
    // Float animation for background elements
    gsap.to(".contact-float", {
      y: -15,
      x: 5,
      rotate: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
          <p className="contact-animate text-center text-lg font-semibold text-primary mb-2">Get in Touch</p>
          <h2 className="contact-animate text-center text-4xl font-bold mb-16">Contact Me</h2>
          
          {/* 3D Contact Form Card */}
          <TiltCard maxTilt={5}>
            <div className="contact-animate relative bg-card rounded-xl p-8 md:p-10 shadow-2xl border border-border transform-gpu transition-all duration-500 overflow-hidden">
              {/* Floating background elements */}
              <div className="contact-float absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 opacity-70"></div>
              <div className="contact-float absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/5 opacity-50" style={{ animationDelay: "-1s" }}></div>
              
              <Form {...form}>
                <AnimatedForm onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="form-element">
                        <div className="relative">
                          <div className="absolute left-4 top-4 text-muted-foreground">
                            <User className="h-5 w-5" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              className="w-full pl-12 p-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300 border-muted" 
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
                      <FormItem className="form-element">
                        <div className="relative">
                          <div className="absolute left-4 top-4 text-muted-foreground">
                            <Mail className="h-5 w-5" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              type="email"
                              className="w-full pl-12 p-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300 border-muted" 
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
                      <FormItem className="form-element">
                        <div className="relative">
                          <div className="absolute left-4 top-4 text-muted-foreground">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your message" 
                              rows={6}
                              className="w-full pl-12 p-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300 resize-none border-muted" 
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
                    className="w-full py-4 text-lg font-semibold hover:scale-[1.02] transition-transform form-element"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" /> Send Message
                      </span>
                    )}
                  </Button>
                </AnimatedForm>
              </Form>
            </div>
          </TiltCard>
        </div>
        
        {/* Back to Top Button */}
        <div className="contact-animate absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
          <a 
            href="#profile" 
            onClick={(e) => {
              e.preventDefault();
              const profileSection = document.getElementById('profile');
              if (profileSection) profileSection.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll to top"
          >
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 flex items-center justify-center border-primary hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronUp className="h-6 w-6 animate-bounce" />
            </Button>
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
