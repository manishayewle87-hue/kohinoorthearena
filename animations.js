/**
 * MAHALAXMI THE ARENA — Ultra Advanced Animation Engine v3.0
 * Custom Cursor · Magnetic · Scroll Reveal · Parallax · 3D Tilt · Particles · Split Text
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMagneticButtons();
  initScrollRevealAdvanced();
  initParallaxLayers();
  initCardTilt3D();
  initSplitTextHeadings();
  initAmbientParticles();
  initSectionGradientShift();
  initStaggerLists();
  initCountersOnScroll();
  initHeroKinetics();
  initNavbarMorphOnScroll();
  initHoverLineReveal();
});

/* ══════════════════════════════════════════════
   1. CUSTOM CURSOR + TRAIL
══════════════════════════════════════════════ */
function initCustomCursor() {
  const cursor     = document.createElement('div');
  const cursorDot  = document.createElement('div');
  cursor.className    = 'ag-cursor';
  cursorDot.className = 'ag-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mx = -200, my = -200;
  let cx = -200, cy = -200;
  let dotX = -200, dotY = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
  });

  // Smooth lag for outer ring
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state on interactive elements
  const hoverTargets = 'a, button, .glass-card, .os-tab-btn, .residence-tab-btn, .filter-btn, .gallery-item, .nav-item a';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('ag-cursor--hover');
      cursorDot.classList.add('ag-cursor-dot--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('ag-cursor--hover');
      cursorDot.classList.remove('ag-cursor-dot--hover');
    });
  });

  document.addEventListener('mousedown', () => cursor.classList.add('ag-cursor--click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('ag-cursor--click'));
}

/* ══════════════════════════════════════════════
   2. MAGNETIC BUTTON EFFECT
══════════════════════════════════════════════ */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn-neon, .btn-glass, .nav-actions .btn');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.35;
      const dy     = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });
}

/* ══════════════════════════════════════════════
   3. ADVANCED SCROLL REVEAL  (clip-path + fade + slide)
══════════════════════════════════════════════ */
function initScrollRevealAdvanced() {
  // Mark elements with data-reveal attributes
  const autoTargets = [
    { sel: '.section-title',        anim: 'slide-up',   delay: 0   },
    { sel: '.section-subtitle',     anim: 'slide-up',   delay: 80  },
    { sel: '.badge-neon',           anim: 'fade-scale',  delay: 0   },
    { sel: '.glass-card',           anim: 'slide-up',   delay: 100 },
    { sel: '.stat-card',            anim: 'slide-up',   delay: 80  },
    { sel: '.pillar-feature-item',  anim: 'slide-left', delay: 60  },
    { sel: '.tower-card',           anim: 'slide-up',   delay: 60  },
    { sel: '.spec-card',            anim: 'slide-up',   delay: 50  },
    { sel: '.connectivity-place',   anim: 'slide-left', delay: 40  },
    { sel: '.rhythm-card',          anim: 'slide-up',   delay: 80  },
    { sel: '.gallery-item',         anim: 'fade-scale', delay: 60  },
    { sel: '.partner-logo-item',    anim: 'fade-scale', delay: 40  },
    { sel: '.legacy-stat',          anim: 'slide-up',   delay: 60  },
    { sel: '.res-spec',             anim: 'slide-up',   delay: 50  },
    { sel: '.res-highlights-list li', anim: 'slide-left', delay: 50},
    { sel: '.amenity-category-card', anim: 'slide-up', delay: 70 },
  ];

  autoTargets.forEach(({ sel, anim, delay }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (el.dataset.revealDone) return;
      el.dataset.reveal     = anim;
      el.dataset.revealDelay = (i * delay);
      el.dataset.revealDone = '1';
      el.classList.add('ag-reveal');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const anim  = el.dataset.reveal || 'slide-up';
      const delay = parseFloat(el.dataset.revealDelay || 0);
      setTimeout(() => {
        el.classList.add('ag-reveal--visible', `ag-reveal--${anim}`);
      }, delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.ag-reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   4. PARALLAX DEPTH LAYERS
══════════════════════════════════════════════ */
function initParallaxLayers() {
  const layers = [
    { sel: '.hero-bg-overlay',   speed: 0.25  },
    { sel: '.hero-content',      speed: -0.08 },
    { sel: '.floating-orb-1',    speed: 0.18  },
    { sel: '.floating-orb-2',    speed: -0.12 },
    { sel: '.floating-orb-3',    speed: 0.22  },
  ];

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        layers.forEach(({ sel, speed }) => {
          document.querySelectorAll(sel).forEach(el => {
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════
   5. 3D CARD TILT ON HOVER
══════════════════════════════════════════════ */
function initCardTilt3D() {
  const cards = document.querySelectorAll('.glass-card, .stat-card, .rhythm-card, .tower-card, .spec-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -8;
      const rotY   = ((x - cx) / cx) *  8;
      const glareX = (x / rect.width)  * 100;
      const glareY = (y / rect.height) * 100;

      card.style.transform    = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition   = 'transform 0.1s ease';
      card.style.setProperty('--glare-x', glareX + '%');
      card.style.setProperty('--glare-y', glareY + '%');
      card.classList.add('ag-tilt-active');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      card.classList.remove('ag-tilt-active');
    });
  });
}

/* ══════════════════════════════════════════════
   6. SPLIT TEXT — HEADING CHARACTER REVEAL
══════════════════════════════════════════════ */
function initSplitTextHeadings() {
  const headings = document.querySelectorAll('.section-title');
  headings.forEach(h => {
    if (h.dataset.split) return;
    h.dataset.split = '1';
    const html = h.innerHTML;
    // Preserve inner tags by splitting text nodes only
    const wrapper = document.createElement('span');
    wrapper.className = 'ag-split-wrapper';
    // Simple word-level split that preserves span tags
    const words = html.split(/(\s+)/);
    wrapper.innerHTML = words.map(word => {
      if (/^\s+$/.test(word)) return word;
      return `<span class="ag-word" style="display:inline-block; overflow:hidden; vertical-align:bottom;">` +
             `<span class="ag-word-inner" style="display:inline-block;">${word}</span></span>`;
    }).join('');
    h.innerHTML = '';
    h.appendChild(wrapper);

    // Observe and trigger
    const wordObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        h.querySelectorAll('.ag-word-inner').forEach((w, i) => {
          w.style.animation = `wordReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms forwards`;
        });
        wordObserver.unobserve(h);
      });
    }, { threshold: 0.2 });
    wordObserver.observe(h);
  });
}

/* ══════════════════════════════════════════════
   7. AMBIENT FLOATING PARTICLES
══════════════════════════════════════════════ */
function initAmbientParticles() {
  const canvas = document.createElement('canvas');
  canvas.id    = 'ag-particles';
  canvas.style.cssText = `
    position: fixed; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 0; opacity: 0.35;
  `;
  document.body.prepend(canvas);

  const ctx    = canvas.getContext('2d');
  let W        = window.innerWidth;
  let H        = window.innerHeight;
  canvas.width  = W;
  canvas.height = H;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const COLORS = ['#DFFE00', '#9B5DE5', '#00F5D4', '#F15BB5'];
  const COUNT  = 55;

  const particles = Array.from({ length: COUNT }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     Math.random() * 1.8 + 0.4,
    vx:    (Math.random() - 0.5) * 0.35,
    vy:    (Math.random() - 0.5) * 0.35,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.6 + 0.2,
  }));

  // Mouse influence
  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      // Drift toward mouse very gently
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        p.vx += dx * 0.00008;
        p.vy += dy * 0.00008;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.8) { p.vx *= 0.97; p.vy *= 0.97; }

      // Wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw connection lines between close particles
    ctx.lineWidth = 0.4;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - dist / 120) * 0.18;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ══════════════════════════════════════════════
   8. SECTION BACKGROUND GRADIENT SHIFT ON SCROLL
══════════════════════════════════════════════ */
function initSectionGradientShift() {
  const body = document.body;
  const gradients = [
    'radial-gradient(ellipse at 20% 50%, rgba(91,66,143,0.18) 0%, transparent 60%)',
    'radial-gradient(ellipse at 80% 30%, rgba(155,93,229,0.15) 0%, transparent 55%)',
    'radial-gradient(ellipse at 50% 80%, rgba(223,254,0,0.06) 0%, transparent 50%)',
    'radial-gradient(ellipse at 10% 70%, rgba(0,245,212,0.10) 0%, transparent 55%)',
    'radial-gradient(ellipse at 90% 60%, rgba(241,91,181,0.10) 0%, transparent 50%)',
  ];

  let currentIdx = 0;
  const overlay = document.createElement('div');
  overlay.id = 'ag-gradient-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    transition: background 1.8s ease; will-change: background;
    background: ${gradients[0]};
  `;
  document.body.prepend(overlay);

  const sections = document.querySelectorAll('section[id]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentIdx = (currentIdx + 1) % gradients.length;
        overlay.style.background = gradients[currentIdx];
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => obs.observe(s));
}

/* ══════════════════════════════════════════════
   9. STAGGER LIST REVEAL
══════════════════════════════════════════════ */
function initStaggerLists() {
  const lists = document.querySelectorAll('.res-highlights-list, .pillar-features-list, .spec-detail-list, .connectivity-list');
  lists.forEach(list => {
    const items = list.querySelectorAll('li, .connectivity-place');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        items.forEach((item, i) => {
          item.style.opacity    = '0';
          item.style.transform  = 'translateX(-20px)';
          item.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
          setTimeout(() => {
            item.style.opacity   = '1';
            item.style.transform = 'translateX(0)';
          }, 50 + i * 60);
        });
        obs.unobserve(list);
      });
    }, { threshold: 0.15 });
    obs.observe(list);
  });
}

/* ══════════════════════════════════════════════
   10. COUNTERS ON SCROLL (for stat numbers)
══════════════════════════════════════════════ */
function initCountersOnScroll() {
  const counters = document.querySelectorAll('.stat-value, .legacy-number, [data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const rawText  = el.dataset.count || el.textContent.trim();
      const numMatch = rawText.match(/[\d.]+/);
      if (!numMatch) return;

      const target    = parseFloat(numMatch[0]);
      const isDecimal = rawText.includes('.');
      const prefix    = rawText.slice(0, rawText.indexOf(numMatch[0]));
      const suffix    = rawText.slice(rawText.indexOf(numMatch[0]) + numMatch[0].length);
      const duration  = 1800;
      const start     = performance.now();

      function tick(now) {
        const t        = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - t, 3);
        const current  = eased * target;
        const display  = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN');
        el.textContent = prefix + display + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + (isDecimal ? target.toFixed(1) : target.toLocaleString('en-IN')) + suffix;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => {
    el.dataset.count = el.dataset.count || el.textContent.trim();
    obs.observe(el);
  });
}

/* ══════════════════════════════════════════════
   11. HERO KINETIC ANIMATIONS
══════════════════════════════════════════════ */
function initHeroKinetics() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  // Add entrance animation to hero elements in sequence
  const elements = heroContent.querySelectorAll('*');
  elements.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = `opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)`;
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, 200 + i * 100);
  });

  // Subtle mouse parallax on hero
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const dx   = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const dy   = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    heroContent.style.transform  = `translate(${dx * 0.4}px, ${dy * 0.4}px)`;
    heroContent.style.transition = 'transform 0.2s ease';
  });
  hero.addEventListener('mouseleave', () => {
    heroContent.style.transform  = '';
    heroContent.style.transition = 'transform 1s ease';
  });
}

/* ══════════════════════════════════════════════
   12. NAVBAR GLASS MORPH ON SCROLL
══════════════════════════════════════════════ */
function initNavbarMorphOnScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 300) {
      navbar.style.transform  = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      navbar.style.transform  = 'translateY(0)';
      navbar.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ══════════════════════════════════════════════
   13. NAV LINK HOVER LINE REVEAL
══════════════════════════════════════════════ */
function initHoverLineReveal() {
  document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.setProperty('--line-width', '100%');
    });
    link.addEventListener('mouseleave', () => {
      if (!link.classList.contains('active')) {
        link.style.setProperty('--line-width', '0%');
      }
    });
  });
}
