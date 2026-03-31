/* ============================================================
   TRANSFORM.JS — Hero Strip Cycling Animation
   Cycles the "to" words in the transform strip on an interval.
   To add/edit cycles, update the CYCLES array only.
   ============================================================ */

const CYCLES = [
  ['working tools',    'clear signal',      'living systems'],
  ['shipped product',  'team alignment',    'real insight'],
  ['real capability',  'measurable output', 'better decisions'],
  ['live prototypes',  'structured data',   'earned trust'],
];

const INTERVAL_MS  = 3500;
const FADE_MS      = 280;

/**
 * Initialises the transform strip cycling animation.
 * Targets elements with [data-transform-to] attribute.
 */
export function initTransform() {

  const targets = document.querySelectorAll('[data-transform-to]');

  if (!targets.length) return;

  let index = 0;

  setInterval(() => {
    index = (index + 1) % CYCLES.length;
    const words = CYCLES[index];

    targets.forEach((el, i) => {
      // Fade out
      el.style.opacity   = '0';
      el.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        el.textContent     = words[i] ?? el.textContent;
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, FADE_MS);
    });

  }, INTERVAL_MS);

  // Ensure smooth transition is set
  targets.forEach(el => {
    el.style.transition = `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`;
  });
}
