"use client";
import { useEffect } from 'react';

export default function GlobalScripts() {
  useEffect(() => {
    // Scroll Reveal System
    const initScrollReveal = () => {
      const els = document.querySelectorAll('[data-reveal]');
      if (!els.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => observer.observe(el));
    };

    // Navbar Scroll
    const initNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      const onScroll = () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // initial check
      return () => window.removeEventListener('scroll', onScroll);
    };

    // Scroll Progress
    const initScrollProgress = () => {
      const bar = document.getElementById('scroll-progress');
      if (!bar) return;
      const onScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = pct + '%';
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    };

    initScrollReveal();
    const cleanupNav = initNavbar();
    const cleanupProgress = initScrollProgress();

    return () => {
      if (cleanupNav) cleanupNav();
      if (cleanupProgress) cleanupProgress();
    };
  }, []);

  return null;
}
