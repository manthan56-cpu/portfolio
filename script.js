/* ==========================================================================
   MANTHAN RAJPUT PORTFOLIO — KINETIC & INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. MOBILE NAVIGATION & HAMBURGER ----------
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.getElementById('nav-links');
  const menuToggle = document.querySelector('.menu-toggle');

  function toggleMenu(forceState) {
    const isOpening = forceState !== undefined ? forceState : !navLinks.classList.contains('is-open');
    navLinks.classList.toggle('is-open', isOpening);
    if (siteNav) siteNav.classList.toggle('is-open', isOpening);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpening));
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close mobile nav when clicking any link
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        toggleMenu(false);
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('is-open')) {
      toggleMenu(false);
      if (menuToggle) menuToggle.focus();
    }
  });


  // ---------- 2. 3D CARD DECK CAROUSEL (SHOWCASE / LAB) ----------
  const deckCards = [...document.querySelectorAll('.deck-card')];
  const deckNote = document.querySelector('.deck-note');
  const deckCurrent = document.querySelector('.deck-current');
  const deckTotal = document.querySelector('.deck-total');
  const deckProgressFill = document.querySelector('.deck-progress-fill');
  const btnPrev = document.querySelector('.dial-prev');
  const btnNext = document.querySelector('.dial-next');

  let activeDeckIdx = 0;
  let outgoingCard = null;

  function renderDeck() {
    if (!deckCards.length) return;

    deckCards.forEach((card, idx) => {
      card.classList.remove('is-active', 'is-next-1', 'is-next-2', 'is-next-3', 'is-hidden');
      const dist = (idx - activeDeckIdx + deckCards.length) % deckCards.length;

      if (dist === 0) card.classList.add('is-active');
      else if (dist === 1) card.classList.add('is-next-1');
      else if (dist === 2) card.classList.add('is-next-2');
      else if (dist === 3) card.classList.add('is-next-3');
      else card.classList.add('is-hidden');
    });

    if (outgoingCard && outgoingCard !== deckCards[activeDeckIdx]) {
      outgoingCard.classList.add('is-out');
      const temp = outgoingCard;
      window.setTimeout(() => temp.classList.remove('is-out'), 450);
    }

    if (deckCurrent) {
      deckCurrent.textContent = String(activeDeckIdx + 1).padStart(2, '0');
    }
    if (deckTotal) {
      deckTotal.textContent = String(deckCards.length).padStart(2, '0');
    }
    if (deckProgressFill) {
      const pct = ((activeDeckIdx + 1) / deckCards.length) * 100;
      deckProgressFill.style.width = `${pct}%`;
    }
    if (deckNote && deckCards[activeDeckIdx]) {
      deckNote.textContent = deckCards[activeDeckIdx].dataset.note || '';
    }

    outgoingCard = deckCards[activeDeckIdx];
  }

  function stepDeck(delta) {
    outgoingCard = deckCards[activeDeckIdx];
    activeDeckIdx = (activeDeckIdx + delta + deckCards.length) % deckCards.length;
    renderDeck();
  }

  if (btnNext) btnNext.addEventListener('click', () => stepDeck(1));
  if (btnPrev) btnPrev.addEventListener('click', () => stepDeck(-1));

  deckCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx === activeDeckIdx) {
        stepDeck(1);
      } else {
        outgoingCard = deckCards[activeDeckIdx];
        activeDeckIdx = idx;
        renderDeck();
      }
    });

    // Keyboard support
    card.tabIndex = 0;
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Initial Deck render
  renderDeck();


  // ---------- 3. MYSTERY GUESS BOX (STACK / PRONITES) ----------
  const guessBox = document.querySelector('.guess-box');

  if (guessBox) {
    guessBox.addEventListener('click', () => {
      if (guessBox.classList.contains('is-done')) {
        guessBox.classList.remove('is-done');
        guessBox.setAttribute('aria-expanded', 'false');
        return;
      }
      if (guessBox.classList.contains('is-loading')) return;

      guessBox.classList.add('is-loading');
      window.setTimeout(() => {
        guessBox.classList.remove('is-loading');
        guessBox.classList.add('is-done');
        guessBox.setAttribute('aria-expanded', 'true');
      }, 950);
    });
  }


  // ---------- 4. TOUCH-TO-PAUSE ON MARQUEE LANES (MOBILE/TABLET) ----------
  const lanes = document.querySelectorAll('.lane');
  lanes.forEach((lane) => {
    const laneGroup = lane.querySelector('.lane-group');
    if (!laneGroup) return;

    lane.addEventListener('touchstart', () => {
      laneGroup.style.animationPlayState = 'paused';
    }, { passive: true });

    lane.addEventListener('touchend', () => {
      laneGroup.style.animationPlayState = 'running';
    }, { passive: true });
  });


  // ---------- 5. QUANTITATIVE NUMERIC COUNTERS (EASE-OUT CUBIC) ----------
  const countElements = [...document.querySelectorAll('[data-count]')];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);

      if (prefersReduced) {
        el.textContent = String(target);
      } else {
        const start = performance.now();
        const duration = 1800; // 1.8 seconds

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out cubic formula: 1 - (1 - t)^3
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(eased * target));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = String(target);
          }
        };

        requestAnimationFrame(tick);
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.35 });

  countElements.forEach((el) => countObserver.observe(el));


  // ---------- 6. LIVE NEW DELHI CLOCK (UTC +05:30) ----------
  const clockDisplay = document.getElementById('delhi-clock');

  function updateDelhiClock() {
    if (!clockDisplay) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockDisplay.textContent = `${timeString} IST`;
    } catch {
      clockDisplay.textContent = 'UTC +05:30';
    }
  }

  updateDelhiClock();
  setInterval(updateDelhiClock, 1000);


  // ---------- 7. BACK TO TOP BUTTON ----------
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
