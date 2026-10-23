/**
 * SASI WEDS ABI — ONE-PAGE SCROLL AUTOMATION & AUDIO CONTROLLER
 * Distinct scroll-triggered animations for each scene with GSAP ScrollTrigger
 * Single-run celebratory petal shower + Audio player placeholder
 */

(function () {
  'use strict';

  // Auspicious ceremony timestamp: Sunday, 15th November 2026, 6:00 PM IST
  const CEREMONY_DATE_MS = new Date('2026-11-15T18:00:00+05:30').getTime();

  document.addEventListener('DOMContentLoaded', () => {
    initSingleRunPetalShower();
    initAudioPlayerPlaceholder();
    initAutomatedScrollAnimations();
    initCountdownTimer();
  });

  /* --------------------------------------------------------------------------
     1. ONE-TIME JASMINE PETAL SHOWER (RUNS ONCE ON LOAD & FINISHES)
     -------------------------------------------------------------------------- */
  function initSingleRunPetalShower() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const PETAL_COUNT = window.innerWidth < 480 ? 12 : 20;

    for (let i = 0; i < PETAL_COUNT; i++) {
      createSinglePetal(container, i * 220);
    }

    // Clean up container after 7 seconds so no background processes or loops continue
    setTimeout(() => {
      container.innerHTML = '';
      container.style.display = 'none';
    }, 7500);

    function createSinglePetal(parent, delayMs) {
      const petal = document.createElement('div');
      petal.className = 'single-petal-node';

      const size = Math.random() * 8 + 9; // 9px to 17px
      const left = Math.random() * 92 + 2; // 2% to 94%
      const duration = Math.random() * 2 + 5; // 5s to 7s
      const delay = delayMs / 1000;

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.35}px`;
      petal.style.left = `${left}vw`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      parent.appendChild(petal);
    }
  }

  /* --------------------------------------------------------------------------
     2. AUDIO / MUSIC PLAYER PLACEHOLDER CONTROLLER
     -------------------------------------------------------------------------- */
  function initAudioPlayerPlaceholder() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const vinylDisc = document.getElementById('disc-vinyl-elem');
    const audioTrack = document.getElementById('wedding-audio-track');
    const musicWaves = document.querySelector('.music-waves');

    if (!musicBtn || !audioTrack) return;

    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
      if (!isPlaying) {
        // Attempt to play audio
        const playPromise = audioTrack.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              isPlaying = true;
              vinylDisc?.classList.add('playing');
              musicWaves?.classList.add('active');
            })
            .catch(() => {
              // In case audio file is still placeholder or blocked, activate visual playback indicator
              isPlaying = true;
              vinylDisc?.classList.add('playing');
              musicWaves?.classList.add('active');
            });
        }
      } else {
        audioTrack.pause();
        isPlaying = false;
        vinylDisc?.classList.remove('playing');
        musicWaves?.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. DISTINCT AUTOMATED SCROLL ANIMATIONS FOR EACH SCENE
     -------------------------------------------------------------------------- */
  function initAutomatedScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      buildSceneScrollAnimations();
    } else {
      buildFallbackObserver();
    }
  }

  function buildSceneScrollAnimations() {
    // ------------------------------------------------------------------------
    // SCENE 1: SACRED TORANAM & OPENING COVER (Runs automatically on page load)
    // ------------------------------------------------------------------------
    const coverTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    coverTl
      .from('.toranam-svg-img', { opacity: 0, y: -25, duration: 1.1 })
      .from('.shree-invocation', { opacity: 0, scale: 0.88, duration: 0.7 }, '-=0.5')
      .from('.season-kicker', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.couple-names-block .c-name', { opacity: 0, y: 35, stagger: 0.22, duration: 0.95 }, '-=0.3')
      .from('.couple-names-block .c-weds', { opacity: 0, scale: 0.5, duration: 0.5 }, '-=0.6')
      .from('.hashtag-pill-gold', { opacity: 0, scale: 0.9, duration: 0.5 }, '-=0.3')
      .from('.invite-lead-text', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
      .from('.date-summary-gold-strip', { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
      .from('.scroll-indicator-wrap', { opacity: 0, duration: 0.6 }, '-=0.2');

    // ------------------------------------------------------------------------
    // SCENE 2: THE COUPLE ARTWORK
    // Distinct Animation: 3D perspective float + gentle zoom
    // ------------------------------------------------------------------------
    gsap.from('#scene-couple .couple-art-frame-gold', {
      scrollTrigger: {
        trigger: '#scene-couple',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 45,
      scale: 0.94,
      rotationX: 4,
      duration: 1.2,
      ease: 'power2.out'
    });

    // ------------------------------------------------------------------------
    // SCENE 3: ENGAGEMENT (NATURAL RINGS & CEREMONY EXCHANGE PAINTING)
    // Distinct Animation: Natural rings slide up -> diamond light ray sparkle -> ceremony painting fade
    // ------------------------------------------------------------------------
    const ringsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-rings',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    ringsTl
      .from('#rings-natural-box', {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.9,
        ease: 'power2.out'
      })
      // Diamond flare ray animation
      .to('#diamond-shine-elem', {
        scale: 2.2,
        opacity: 1,
        duration: 0.5,
        ease: 'power1.in',
        onStart: () => {
          document.getElementById('diamond-shine-elem')?.classList.add('active');
        }
      })
      .to('#diamond-shine-elem', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
      // Ceremony exchange painting reveal
      .from('#exchange-art-box', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.2');

    // ------------------------------------------------------------------------
    // SCENE 4: BELOVED FAMILIES
    // Distinct Animation: Dual staggered fold-in from left and right
    // ------------------------------------------------------------------------
    gsap.from('#family-groom-box', {
      scrollTrigger: {
        trigger: '#scene-family',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power2.out'
    });

    gsap.from('#family-bride-box', {
      scrollTrigger: {
        trigger: '#scene-family',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power2.out'
    });

    gsap.from('#scene-family .formal-wording-panel', {
      scrollTrigger: {
        trigger: '#scene-family',
        start: 'top 65%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });

    // ------------------------------------------------------------------------
    // SCENE 5: CEREMONY DETAILS, COUNTDOWN & SMOOTH NAV
    // Distinct Animation: 3D bounce scale for countdown + sequential row elevations
    // ------------------------------------------------------------------------
    gsap.from('#countdown-card-elem', {
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 0.9,
      ease: 'back.out(1.4)'
    });

    gsap.from(['#event-date-tile', '#event-venue-tile'], {
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 25,
      stagger: 0.2,
      duration: 0.85,
      ease: 'power2.out'
    });

    gsap.from('#nav-action-box', {
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 60%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });

    // ------------------------------------------------------------------------
    // SCENE 6: CLOSING BLESSING
    // ------------------------------------------------------------------------
    gsap.from('#scene-closing', {
      scrollTrigger: {
        trigger: '#scene-closing',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power2.out'
    });
  }

  function buildFallbackObserver() {
    const sections = document.querySelectorAll('.story-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach((sec) => {
      sec.style.opacity = '0';
      sec.style.transform = 'translateY(30px)';
      sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(sec);
    });
  }

  /* --------------------------------------------------------------------------
     4. LIVE COUNTDOWN TIMER ENGINE
     -------------------------------------------------------------------------- */
  function initCountdownTimer() {
    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-minutes');
    const secsEl = document.getElementById('count-seconds');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function renderTime() {
      const now = Date.now();
      const diff = CEREMONY_DATE_MS - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    renderTime();
    setInterval(renderTime, 1000);
  }

})();
