/**
 * SASI WEDS ABI — INTERACTIVE CONTROLLER & MOTION DESIGN
 * Coordinated GSAP Timelines, Countdown, Ring Sequence, Petal Canvas & Actions
 */

(function () {
  'use strict';

  // Target event time: Sunday, 15th November 2026, 6:00 PM IST
  const EVENT_TIME_MS = new Date('2026-11-15T18:00:00+05:30').getTime();

  document.addEventListener('DOMContentLoaded', () => {
    initMotionToggle();
    initPetalsCanvas();
    initCountdown();
    initRingSequence();
    initCalendarActions();
    initSharingActions();
    initGsapAnimations();
  });

  /* --------------------------------------------------------------------------
     1. ACCESSIBLE MOTION TOGGLE
     -------------------------------------------------------------------------- */
  function initMotionToggle() {
    const toggleBtn = document.getElementById('motion-toggle-btn');
    if (!toggleBtn) return;

    const onIcon = toggleBtn.querySelector('.motion-on-icon');
    const offIcon = toggleBtn.querySelector('.motion-off-icon');

    // Check media query or saved state
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const savedPreference = localStorage.getItem('sasi_abi_motion');

    if (savedPreference === 'reduced' || (savedPreference === null && prefersReduced)) {
      setMotionState(true);
    } else {
      setMotionState(false);
    }

    toggleBtn.addEventListener('click', () => {
      const isCurrentlyReduced = document.body.classList.contains('motion-reduced');
      setMotionState(!isCurrentlyReduced);
    });

    function setMotionState(reduced) {
      if (reduced) {
        document.body.classList.add('motion-reduced');
        onIcon?.classList.add('hidden');
        offIcon?.classList.remove('hidden');
        localStorage.setItem('sasi_abi_motion', 'reduced');
      } else {
        document.body.classList.remove('motion-reduced');
        onIcon?.classList.remove('hidden');
        offIcon?.classList.add('hidden');
        localStorage.setItem('sasi_abi_motion', 'normal');
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. FLOATING JASMINE PETALS PARTICLES
     -------------------------------------------------------------------------- */
  function initPetalsCanvas() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    // Respect reduced motion
    if (document.body.classList.contains('motion-reduced') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const MAX_PETALS = window.innerWidth < 640 ? 12 : 22;

    for (let i = 0; i < MAX_PETALS; i++) {
      createPetal(container, i * 400);
    }

    function createPetal(parent, delayMs) {
      const petal = document.createElement('div');
      petal.className = 'petal-node';

      // Randomize sizes, start positions, and durations
      const size = Math.random() * 8 + 9; // 9px to 17px
      const left = Math.random() * 96; // 0 to 96vw
      const duration = Math.random() * 6 + 8; // 8s to 14s
      const delay = delayMs / 1000 + Math.random() * 2;

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.left = `${left}vw`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      parent.appendChild(petal);
    }
  }

  /* --------------------------------------------------------------------------
     3. LIVE COUNTDOWN TIMER
     -------------------------------------------------------------------------- */
  function initCountdown() {
    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function update() {
      const now = new Date().getTime();
      const distance = EVENT_TIME_MS - now;

      if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  /* --------------------------------------------------------------------------
     4. SIGNATURE RING-EXCHANGE INTERACTIVE STORY SEQUENCE
     -------------------------------------------------------------------------- */
  function initRingSequence() {
    const step1Pane = document.getElementById('ring-step-1');
    const step2Pane = document.getElementById('ring-step-2');
    const dot1 = document.getElementById('dot-step-1');
    const dot2 = document.getElementById('dot-step-2');
    const replayBtn = document.getElementById('replay-exchange-btn');
    const glowBurst = document.getElementById('exchange-glow');

    if (!step1Pane || !step2Pane) return;

    let currentStep = 1;
    let autoPlayTimer = null;

    function goToStep(stepNumber, userTriggered = false) {
      if (userTriggered && autoPlayTimer) {
        clearTimeout(autoPlayTimer);
      }

      currentStep = stepNumber;

      if (stepNumber === 1) {
        step1Pane.classList.add('active');
        step2Pane.classList.remove('active');
        dot1?.classList.add('active');
        dot1?.setAttribute('aria-selected', 'true');
        dot2?.classList.remove('active');
        dot2?.setAttribute('aria-selected', 'false');
        glowBurst?.classList.remove('spark');
      } else {
        step1Pane.classList.remove('active');
        step2Pane.classList.add('active');
        dot1?.classList.remove('active');
        dot1?.setAttribute('aria-selected', 'false');
        dot2?.classList.add('active');
        dot2?.setAttribute('aria-selected', 'true');

        // Sparkle burst on ring exchange reveal
        setTimeout(() => {
          glowBurst?.classList.add('spark');
        }, 200);
      }
    }

    // Step dots interaction
    dot1?.addEventListener('click', () => goToStep(1, true));
    dot2?.addEventListener('click', () => goToStep(2, true));

    // Replay sequence button
    replayBtn?.addEventListener('click', () => {
      goToStep(1, true);
      triggerCelebrationConfetti();
      autoPlayTimer = setTimeout(() => {
        goToStep(2, false);
      }, 3500);
    });

    // Initial gentle auto-progression on scroll into view
    let hasPlayedInitially = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayedInitially) {
          hasPlayedInitially = true;
          autoPlayTimer = setTimeout(() => {
            if (currentStep === 1) {
              goToStep(2, false);
            }
          }, 4500);
        }
      });
    }, { threshold: 0.4 });

    const sequenceBox = document.getElementById('ring-sequence-box');
    if (sequenceBox) observer.observe(sequenceBox);
  }

  // Micro celebration burst
  function triggerCelebrationConfetti() {
    const toast = document.getElementById('toast-notification');
    showToast('✨ Sacred ring exchange blessing replayed ✨');
  }

  /* --------------------------------------------------------------------------
     5. CALENDAR SYNC & .ICS FILE GENERATION
     -------------------------------------------------------------------------- */
  function initCalendarActions() {
    const downloadIcsBtn = document.getElementById('download-ics-btn');
    const googleCalLink = document.getElementById('google-cal-link');

    const calData = (window.INVITATION_INFO && window.INVITATION_INFO.calendar) || {
      title: 'Dr. Sasidharan & Dr. Abinaya — Engagement Ceremony',
      description: 'Engagement Ceremony of Dr. Sasidharan S and Dr. Abinaya M (#LoveGotPrescribed) at Amman Sakthi Mahal, Thiruvarur.',
      location: 'Amman Sakthi Mahal, No. 61c, Thiyagaraja Agraharam, Suntharvilagam Main Road, Thiruvarur - 610001',
      startDate: '20261115T123000Z',
      endDate: '20261115T140000Z'
    };

    // 1. Google Calendar URL
    if (googleCalLink) {
      const gUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(calData.title)}` +
        `&dates=${calData.startDate}/${calData.endDate}` +
        `&details=${encodeURIComponent(calData.description)}` +
        `&location=${encodeURIComponent(calData.location)}`;
      googleCalLink.setAttribute('href', gUrl);
    }

    // 2. ICS File Download
    if (downloadIcsBtn) {
      downloadIcsBtn.addEventListener('click', () => {
        const icsContent = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Sasi Weds Abi//Engagement Invitation//EN',
          'CALSCALE:GREGORIAN',
          'METHOD:PUBLISH',
          'BEGIN:VEVENT',
          `UID:sasi-weds-abi-engagement-20261115@kismetstudios.com`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `DTSTART:${calData.startDate}`,
          `DTEND:${calData.endDate}`,
          `SUMMARY:${calData.title}`,
          `DESCRIPTION:${calData.description}`,
          `LOCATION:${calData.location}`,
          'STATUS:CONFIRMED',
          'SEQUENCE:0',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'sasi-weds-abi-engagement.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Calendar invite (.ics) downloaded!');
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. WHATSAPP SHARING & COPY LINK
     -------------------------------------------------------------------------- */
  function initSharingActions() {
    const whatsappBtn = document.getElementById('whatsapp-share-btn');
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const copyText = document.getElementById('copy-text');

    const shareMessage = 
      "Joining the celebration of Dr. Sasidharan & Dr. Abinaya's Engagement! #LoveGotPrescribed\n" +
      "📅 Date: Sunday, 15th November, 2026 (6:00 PM - 7:30 PM)\n" +
      "📍 Venue: Amman Sakthi Mahal, Thiruvarur\n\n" +
      "View the animated e-invitation here: " + window.location.href;

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }

    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', async () => {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(window.location.href);
          } else {
            // Fallback for non-https or older environments
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }

          if (copyText) copyText.textContent = 'Link Copied! ✓';
          showToast('Invitation link copied to clipboard!');
          setTimeout(() => {
            if (copyText) copyText.textContent = 'Copy Invite Link';
          }, 2500);
        } catch (err) {
          showToast('Failed to copy. Please copy the URL from browser bar.');
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     8. GSAP TIMELINES & SCROLLTRIGGER REVEALS
     -------------------------------------------------------------------------- */
  function initGsapAnimations() {
    // If GSAP is not loaded or user prefers reduced motion, return gracefully
    if (typeof gsap === 'undefined' || document.body.classList.contains('motion-reduced') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Opening Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

    heroTl
      .from('.temple-arch-svg', { opacity: 0, y: -25, duration: 1 })
      .from('.traditional-badge-wrapper', { opacity: 0, scale: 0.9, duration: 0.8 }, '-=0.6')
      .from('.hero-title span', { opacity: 0, y: 30, stagger: 0.18 }, '-=0.5')
      .from('.hero-subtitle-box', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.urli-hero-card', { opacity: 0, y: 35, duration: 1.2 }, '-=0.5')
      .from('.hero-action-group a', { opacity: 0, y: 15, stagger: 0.15, duration: 0.6 }, '-=0.6');

    // Scroll-triggered section reveals if ScrollTrigger is present
    if (typeof ScrollTrigger !== 'undefined') {
      // Couple Section
      gsap.from('.couple-card-main', {
        scrollTrigger: {
          trigger: '#couple-scene',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: 'power2.out'
      });

      // Silk Invitation Card
      gsap.from('.silk-invitation-card', {
        scrollTrigger: {
          trigger: '#invitation-wording-scene',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.96,
        y: 35,
        duration: 1.2,
        ease: 'power2.out'
      });

      // Family Cards
      gsap.from('.family-card', {
        scrollTrigger: {
          trigger: '#family-scene',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power2.out'
      });

      // Event Details Cards
      gsap.from('.detail-card', {
        scrollTrigger: {
          trigger: '#event-details-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }

})();
