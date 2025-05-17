import { useEffect, useRef, ReactNode, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export default function AnimatedForm({ children, onSubmit, className = '' }: AnimatedFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form animation on mount
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    
    // Animate form elements on initial render
    const formElements = form.querySelectorAll('input, textarea, button, .form-label, .form-element');
    
    gsap.fromTo(formElements, 
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }, []);
  
  // Handle form submission animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const form = formRef.current;
    if (!form) return;
    
    setIsSubmitting(true);
    
    // Get form elements
    const formElements = form.querySelectorAll('input, textarea, button');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Animate button loading state
    gsap.to(submitButton, {
      scale: 0.95,
      duration: 0.2,
      ease: 'power1.out'
    });
    
    // Create pulsing animation for submit button
    const pulseTimeline = gsap.timeline({ repeat: -1 });
    pulseTimeline.to(submitButton, {
      boxShadow: '0 0 0 4px rgba(0, 113, 255, 0.3)',
      duration: 0.8,
      ease: 'sine.inOut'
    });
    pulseTimeline.to(submitButton, {
      boxShadow: '0 0 0 1px rgba(0, 113, 255, 0)',
      duration: 0.8,
      ease: 'sine.inOut'
    });
    
    try {
      // Call the original submit handler
      await onSubmit(e);
      
      // Kill the pulse animation
      pulseTimeline.kill();
      
      // Success animation
      gsap.to(submitButton, {
        scale: 1,
        backgroundColor: '#22c55e', // green
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Animate the whole form
      gsap.to(formElements, {
        y: -10,
        opacity: 0,
        stagger: 0.05,
        delay: 0.5,
        duration: 0.4,
        ease: 'power2.in'
      });
      
      // Fade in "message sent" text
      const messageSent = document.createElement('div');
      messageSent.className = 'text-center py-16 opacity-0';
      messageSent.innerHTML = `
        <svg class="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-xl font-semibold mb-2">Message Sent!</h3>
        <p class="text-muted-foreground">Thanks for reaching out! I'll get back to you soon.</p>
      `;
      
      form.appendChild(messageSent);
      
      gsap.to(messageSent, {
        opacity: 1,
        y: -10,
        delay: 0.8,
        duration: 0.6
      });
      
      // Reset the form after a delay
      setTimeout(() => {
        form.reset();
        setIsSubmitting(false);
        
        // Remove the success message
        gsap.to(messageSent, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          onComplete: () => {
            form.removeChild(messageSent);
            
            // Fade the form elements back in
            gsap.to(formElements, {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.4,
              clearProps: 'all'
            });
          }
        });
      }, 3000);
      
    } catch (error) {
      // Kill the pulse animation
      pulseTimeline.kill();
      
      // Error animation
      gsap.to(submitButton, {
        scale: 1,
        backgroundColor: '#ef4444', // red
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Shake the form
      gsap.to(form, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: 'power2.out'
      });
      
      // Reset after error
      setTimeout(() => {
        setIsSubmitting(false);
        gsap.to(submitButton, {
          backgroundColor: '',
          clearProps: 'backgroundColor'
        });
      }, 1500);
    }
  };
  
  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      {children}
    </form>
  );
}