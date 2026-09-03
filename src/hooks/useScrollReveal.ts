import { useEffect } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Lightweight, zero-dependency hook using IntersectionObserver for bidirectional scroll reveals.
 * Automatically finds elements with `.reveal-init` or `.reveal-scale-init` inside the container.
 * Supports `data-reveal-delay` for natural cascading stagger effects.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -30px 0px' } = options;

  useEffect(() => {
    // If user prefers reduced motion, make all elements immediately visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-init, .reveal-scale-init').forEach((el) => {
        el.classList.add('reveal-visible', 'reveal-scale-visible');
      });
      return;
    }

    const elements = document.querySelectorAll('.reveal-init, .reveal-scale-init');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const isScale = el.classList.contains('reveal-scale-init');
          const visibleClass = isScale ? 'reveal-scale-visible' : 'reveal-visible';

          // Apply optional stagger delay if specified
          const delay = el.dataset.revealDelay;
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }

          if (entry.isIntersecting) {
            el.classList.add(visibleClass);
          } else {
            // Bidirectional: fade out when scrolled out of view
            el.classList.remove(visibleClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);
}
