/**
 * SASI WEDS ABI — AUTOMATED ON-SCROLL ANIMATION ENGINE
 * Inspired by South Indian Wedding Reels (@airavaatstudio.in style)
 * Fully automated reveals on scroll with GSAP ScrollTrigger
 */

(function () {
  'use strict';

  // Auspicious ceremony timestamp: Sunday, 15th November 2026, 6:00 PM IST
  const CEREMONY_DATE_MS = new Date('2026-11-15T18:00:00+05:30').getTime();

  document.addEventListener('DOMContentLoaded', () => {
    initAutomatedScrollAnimations();
    initCountdownTimer();
    initFloatingPetals();
    initQuickActions();
  });

  /* --------------------------------------------------------------------------
     1. AUTOMATED ON-SCROLL GSAP REVEALS (NO USER CLICKS REQUIRED)
     -------------------------------------------------------------------------- */
  function initAutomatedScrollAnimations() {
    // If GSAP is loaded, register ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      setupGsapScrollSequence();
    } else {
      setupIntersectionObserverFallback();
    }
  }

  function setupGsapScrollSequence() {
    // Scene 1: Opening entrance animation (runs automatically on page load)
    const openTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    openTl
      .from('.temple-arch-svg', { opacity: 0, y: -25, duration: 1 })
      .from('.blessing-pill', { opacity: 0, scale: 0.85, duration: 0.7 }, '-=0.5')
      .from('.tagline-kicker', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.couple-names-headline .name-text', { opacity: 0, y: 30, stagger: 0.2, duration: 0.9 }, '-=0.3')
      .from('.couple-names-headline .name-ampersand', { opacity: 0, scale: 0.5, duration: 0.5 }, '-=0.6')
      .from('.hashtag-chip', { opacity: 0, scale: 0.9, duration: 0.5 }, '-=0.3')
      .from('.invitation-phrase', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
      .from('.date-ribbon', { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
      .from('.scroll-down-hint', { opacity: 0, duration: 0.5 }, '-=0.2');

    // Scene 2: Couple Artwork Automated Reveal
    gsap.from('#scene-couple .couple-art-frame', {
      scrollTrigger: {
        trigger: '#scene-couple',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 1.1,
      ease: 'power2.out'
    });

    // Scene 3: AUTOMATED RING EXCHANGE (Mothiram Mathuthal)
    // The rings glide toward each other, sparkle, and reveal the ceremony art
    const ringTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-rings',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    ringTl
      // Rings slide in toward center
      .fromTo('#ring-groom-elem', 
        { x: -140, opacity: 0 }, 
        { x: -28, opacity: 1, duration: 1.1, ease: 'power2.out' }
      )
      .fromTo('#ring-bride-elem', 
        { x: 90, opacity: 0 }, 
        { x: -16, opacity: 1, duration: 1.1, ease: 'power2.out' }, 
        '<'
      )
      // Sparkle flash flare at center
      .to('#ring-sparkle-center', {
        scale: 2.4,
        opacity: 1,
        duration: 0.45,
        ease: 'power1.in',
        onStart: () => {
          document.getElementById('ring-sparkle-center')?.classList.add('flashing');
        }
      })
      .to('#ring-sparkle-center', {
        scale: 0,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out'
      })
      // Ceremonial painting fades in smoothly below
      .fromTo('#ring-art-reveal', 
        { opacity: 0, y: 30, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, 
        '-=0.3'
      );

    // Scene 4: Family Pillars Automated Reveal
    gsap.from('#scene-family .family-pillar', {
      scrollTrigger: {
        trigger: '#scene-family',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 25,
      stagger: 0.22,
      duration: 0.85,
      ease: 'power2.out'
    });

    gsap.from('#scene-family .formal-quote-box', {
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

    // Scene 5: Ceremony Details & Countdown Clock Automated Reveal
    gsap.from('#scene-details .countdown-strip', {
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.94,
      y: 25,
      duration: 0.85,
      ease: 'back.out(1.4)'
    });

    gsap.from('#scene-details .event-info-block', {
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 25,
      stagger: 0.18,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('#scene-details .action-buttons-wrap', {
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

    // Scene 6: Closing Blessing
    gsap.from('#scene-closing', {
      scrollTrigger: {
        trigger: '#scene-closing',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 25,
      duration: 0.9,
      ease: 'power2.out'
    });
  }

  // Fallback if GSAP is unavailable
  function setupIntersectionObserverFallback() {
    const animItems = document.querySelectorAll('.anim-item, .couple-art-frame, #ring-art-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animItems.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     2. ACCURATE LIVE COUNTDOWN ENGINE
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

  /* --------------------------------------------------------------------------
     3. FLOATING JASMINE PETALS (AMBIENT SILK PARTICLES)
     -------------------------------------------------------------------------- */
  function initFloatingPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const COUNT = window.innerWidth < 480 ? 9 : 15;

    for (let i = 0; i < COUNT; i++) {
      createPetal(container, i * 400);
    }

    function createPetal(parent, delayMs) {
      const petal = document.createElement('div');
      petal.className = 'petal-node';

      const size = Math.random() * 7 + 8; // 8px to 15px
      const left = Math.random() * 94; // 0 to 94vw
      const duration = Math.random() * 4 + 8; // 8s to 12s
      const delay = delayMs / 1000 + Math.random() * 2;

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.35}px`;
      petal.style.left = `${left}vw`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      parent.appendChild(petal);
    }
  }

  /* --------------------------------------------------------------------------
     4. USER ACTIONS: CALENDAR & WHATSAPP
     -------------------------------------------------------------------------- */
  function initQuickActions() {
    const calBtn = document.getElementById('add-to-calendar-btn');
    const shareBtn = document.getElementById('whatsapp-share-btn');

    // Calendar .ics download
    if (calBtn) {
      calBtn.addEventListener('click', () => {
        const icsData = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Sasi Weds Abi//Engagement E-Invite//EN',
          'CALSCALE:GREGORIAN',
          'METHOD:PUBLISH',
          'BEGIN:VEVENT',
          `UID:sasi-weds-abi-${Date.now()}@kismetstudios.com`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          'DTSTART:20261115T123000Z', // 18:00 IST = 12:30 UTC
          'DTEND:20261115T140000Z',   // 19:30 IST = 14:00 UTC
          'SUMMARY:Dr. Sasidharan & Dr. Abinaya — Engagement Ceremony',
          'DESCRIPTION:Engagement Ceremony of Dr. Sasidharan S & Dr. Abinaya M (#LoveGotPrescribed) at Amman Sakthi Mahal, Thiruvarur.',
          'LOCATION:Amman Sakthi Mahal, No. 61c, Thiyagaraja Agraharam, Suntharvilagam Main Road, Thiruvarur - 610001',
          'STATUS:CONFIRMED',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'sasi-weds-abi-engagement.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Event saved to your calendar!');
      });
    }

    // WhatsApp Sharing
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const text = 
          "You are cordially invited to celebrate the Engagement Ceremony of\n" +
          "✨ Dr. Sasidharan & Dr. Abinaya ✨\n" +
          "#LoveGotPrescribed\n\n" +
          "📅 Date: Sunday, 15th November 2026 (6:00 PM - 7:30 PM)\n" +
          "📍 Venue: Amman Sakthi Mahal, Thiruvarur\n\n" +
          "View our e-invitation: " + window.location.href;

        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

})();
