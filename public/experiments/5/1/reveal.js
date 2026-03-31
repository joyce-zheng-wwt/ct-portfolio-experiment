/* ============================================================
   REVEAL.JS — Scroll Reveal Module
   Uses IntersectionObserver to trigger .reveal elements.
   ============================================================ */

/**
 * Initialises scroll-based reveal for all .reveal elements.
 * Once visible, the class .visible is added and the element
 * is unobserved — no repeated triggers.
 *
 * @param {string}  selector  CSS selector for reveal targets
 * @param {number}  threshold Intersection threshold (0–1)
 */
export function initReveal(selector = '.reveal', threshold = 0.12) {

  const elements = document.querySelectorAll(selector);

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  elements.forEach(el => observer.observe(el));
}
