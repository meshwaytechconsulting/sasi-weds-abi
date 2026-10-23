/**
 * SASI WEDS ABI — LIGHT THEME INTERACTIVE SCRIPT
 * Reveal Animations • Live Countdown • Calendar Integration • WhatsApp Sharing
 */

(function () {
  'use strict';

  // Auspicious ceremony timestamp: Sunday, 15th November 2026, 6:00 PM IST
  const CEREMONY_DATE_MS = new Date('2026-11-15T18:00:00+05:30').getTime();

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveals();
    initCountdownTimer();
    initPetalsParticles();
    initActionHandlers();
  });

  /* --------------------------------------------------------------------------
     1. SCROLL REVEAL ANIMATION ENGINE
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach((el) => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    }

    // GSAP enhancement if loaded
    if (typeof gsap !== 'undefined') {
      gsap.from('.temple-arch-gold', { opacity: 0, y: -20, duration: 1, ease: 'power2.out' });
      gsap.from('.sacred-pill', { opacity: 0, scale: 0.9, duration: 0.8, delay: 0.2, ease: 'back.out(1.5)' });
      gsap.from('.couple-title .title-name', { opacity: 0, y: 25, stagger: 0.2, duration: 0.9, delay: 0.3, ease: 'power3.out' });
      gsap.from('.hashtag-badge', { opacity: 0, scale: 0.85, duration: 0.6, delay: 0.6 });
      gsap.from('.date-strip-compact', { opacity: 0, y: 20, duration: 0.8, delay: 0.7 });
    }
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
     3. FLOATING JASMINE PETALS (LIGHT SILK AMBIENCE)
     -------------------------------------------------------------------------- */
  function initPetalsParticles() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const COUNT = window.innerWidth < 500 ? 10 : 18;

    for (let i = 0; i < COUNT; i++) {
      createPetal(container, i * 450);
    }

    function createPetal(parent, delayMs) {
      const petal = document.createElement('div');
      petal.className = 'petal-node';

      const size = Math.random() * 8 + 8; // 8px to 16px
      const left = Math.random() * 95; // 0 to 95vw
      const duration = Math.random() * 5 + 8; // 8s to 13s
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
     4. USER ACTIONS: CALENDAR & WHATSAPP SHARING
     -------------------------------------------------------------------------- */
  function initActionHandlers() {
    const icsBtn = document.getElementById('add-to-calendar-btn');
    const quickCalBtn = document.getElementById('quick-cal-btn');
    const waWishesBtn = document.getElementById('whatsapp-wishes-btn');
    const quickShareBtn = document.getElementById('quick-share-btn');

    // Calendar .ics download
    function triggerIcsDownload() {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sasi Weds Abi//Engagement E-Invite//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:sasi-weds-abi-${Date.now()}@kismetstudios.com`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        'DTSTART:20261115T123000Z', // 18:00 IST
        'DTEND:20261115T140000Z',   // 19:30 IST
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

      showToast('Calendar invitation (.ics) downloaded!');
    }

    if (icsBtn) icsBtn.addEventListener('click', triggerIcsDownload);
    if (quickCalBtn) quickCalBtn.addEventListener('click', triggerIcsDownload);

    // WhatsApp Sharing
    function triggerWhatsAppShare() {
      const text = 
        "You are cordially invited to celebrate the Engagement Ceremony of\n" +
        "✨ Dr. Sasidharan & Dr. Abinaya ✨\n" +
        "#LoveGotPrescribed\n\n" +
        "📅 Date: Sunday, 15th November 2026 (6:00 PM - 7:30 PM)\n" +
        "📍 Venue: Amman Sakthi Mahal, Thiruvarur\n\n" +
        "View the e-invitation here: " + window.location.href;

      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    if (waWishesBtn) waWishesBtn.addEventListener('click', triggerWhatsAppShare);
    if (quickShareBtn) quickShareBtn.addEventListener('click', triggerWhatsAppShare);
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
