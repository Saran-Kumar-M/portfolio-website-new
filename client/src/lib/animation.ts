import { gsap } from "gsap";

/**
 * Animate element from a starting position with opacity
 */
export const fadeInUp = (element: Element, delay: number = 0, y: number = 30) => {
  return gsap.from(element, {
    y,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: "power2.out"
  });
};

/**
 * Animate element with a floating effect
 */
export const floatAnimation = (element: Element, amplitude: number = 15, duration: number = 3) => {
  return gsap.to(element, {
    y: -amplitude,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};

/**
 * Apply parallax effect on scroll to an element
 */
export const parallaxEffect = (element: Element, scrollY: number, factor: number = 0.1) => {
  gsap.to(element, {
    y: scrollY * factor,
    duration: 0.6
  });
};

/**
 * Create a tilt effect for a card on mouse move
 */
export const tiltEffect = (card: HTMLElement, e: MouseEvent, tiltAmount: number = 10) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const xPercent = x / rect.width - 0.5;
  const yPercent = y / rect.height - 0.5;
  
  // Apply transform with perspective for 3D effect
  gsap.to(card, {
    rotateY: xPercent * tiltAmount,
    rotateX: -yPercent * tiltAmount,
    duration: 0.5,
    ease: "power2.out"
  });
};

/**
 * Reset a tilted card to its original position
 */
export const resetTilt = (card: HTMLElement) => {
  gsap.to(card, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.5,
    ease: "power2.out"
  });
};

/**
 * Stagger animate multiple elements
 */
export const staggerElements = (elements: NodeListOf<Element> | Element[], staggerTime: number = 0.1) => {
  return gsap.from(elements, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: staggerTime,
    ease: "power2.out"
  });
};
