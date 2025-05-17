import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import TiltCard from "@/components/3d/TiltCard";

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-16 lg:px-24 perspective"
    >
      <div className="max-w-3xl mx-auto">
        <p className="contact-animate text-center text-lg font-semibold text-primary mb-2">Get in Touch</p>
        <h2 className="contact-animate text-center text-4xl font-bold mb-16">Contact Me</h2>
        
        {/* 3D Contact Form Card */}
        <TiltCard>
          <div className="contact-animate bg-card rounded-xl p-8 md:p-10 shadow-2xl border border-border transform-gpu transition-all duration-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          className="w-full p-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          type="email"
                          className="w-full p-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message" 
                          rows={6}
                          className="w-full p-4 rounded-lg bg-muted focus:ring-2 focus:ring-primary transition-all duration-300 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg font-semibold hover:scale-[1.02] transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
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
          <ChevronUp className="h-8 w-8 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
