/* ============================================================
   MAIN.JS — Init, Nav Scroll, Theme Toggle
   Entry point. Imports and initializes all modules.
   ============================================================ */

import { initReveal }    from './reveal.js';
import { initTransform } from './transform.js';

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll state ──────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Theme toggle ──────────────────────────────────────────
  const toggle   = document.getElementById('theme-toggle');
  const body     = document.body;
  const DARK_KEY = 'ct-dark-mode';

  // Restore saved preference
  if (localStorage.getItem(DARK_KEY) === 'true') {
    body.classList.add('dark');
    toggle.classList.add('active');
  }

  toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    toggle.classList.toggle('active', isDark);
    localStorage.setItem(DARK_KEY, isDark);
  });

  // ── Modules ───────────────────────────────────────────────
  initReveal();
  initTransform();

});
