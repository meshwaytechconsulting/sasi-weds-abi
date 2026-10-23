/* ══════════════════════════════════════════════════════════════════════════
   SASI WEDS ABI — motion engine
   Self-contained: no CDN, no framework. IntersectionObserver reveals,
   rAF parallax, ambient petals/embers, countdown, gate, music.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var INFO   = window.INVITATION_INFO || {};
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ───────────────────────────────────────────── 1 · LETTER SPLITTING ─── */
  function splitLetters(root) {
    $$('[data-rv="letters"] .display-l', root).forEach(function (el) {
      if (el.dataset.split) return;
      el.dataset.split = '1';
      var text = el.textContent;
      el.textContent = '';
      var i = 0;
      text.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'ltr';
        s.textContent = ch === ' ' ? ' ' : ch;
        s.style.transitionDelay = (i * 0.042) + 's';
        el.appendChild(s);
        i++;
      });
    });
  }

  /* ──────────────────────────────────────────────── 2 · REVEAL ENGINE ─── */
  function initReveals() {
    var groups = $$('.scene');

    // stagger siblings inside each scene so a section unfolds, not flashes
    groups.forEach(function (scene) {
      $$('[data-rv]', scene).forEach(function (el, i) {
        if (!el.style.transitionDelay) el.style.transitionDelay = (i * 0.11) + 's';
      });
    });

    if (REDUCE || !('IntersectionObserver' in window)) {
      $$('[data-rv]').forEach(function (el) { el.classList.add('rv-in'); });
      return;
    }

    // The hero sits under the closed gate. Left to the observer it would play
    // its whole reveal out of sight, so the gate hands it over when it opens.
    var held = document.getElementById('gate') ? '#s-hero' : null;
    var pending = $$('[data-rv]').filter(function (el) {
      return !held || !el.closest(held);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('rv-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    pending.forEach(function (el) { io.observe(el); });

    // A fast flick on a phone can outrun IntersectionObserver and leave a
    // section permanently blank. Sweep on scroll and reveal anything the
    // viewport has already passed.
    function sweep() {
      var vh = window.innerHeight;
      pending = pending.filter(function (el) {
        if (el.classList.contains('rv-in')) return false;
        if (el.getBoundingClientRect().top < vh * 0.88) {
          el.classList.add('rv-in');
          io.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onScroll);
    }
    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; sweep(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ──────────────────────────────── 3 · PARALLAX + DOTS + FIRST NUDGE ─── */
  function initScrollFX() {
    var scenes = $$('.scene');
    var layers = $$('.scene-bg[data-par]').map(function (el) {
      return { el: el, speed: parseFloat(el.dataset.par) || 0.1, scene: el.closest('.scene') };
    });

    /* scene dots — which card you are on, and a way to jump */
    var dotBox = $('#dots');
    var dots = [];
    if (dotBox) {
      scenes.forEach(function (sc, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dot';
        var name = sc.dataset.dot || ('Section ' + (i + 1));
        b.setAttribute('aria-label', name);
        b.innerHTML = '<span class="dot-label"></span>';
        b.querySelector('.dot-label').textContent = name;
        b.addEventListener('click', function () {
          sc.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'center' });
        });
        dotBox.appendChild(b);
        dots.push(b);
      });
    }

    var nudge = $('#nudge');
    var ticking = false;

    function frame() {
      ticking = false;
      var vh = window.innerHeight;

      if (!REDUCE) {
        layers.forEach(function (L) {
          var r = L.scene.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          // -1 .. 1 across the viewport
          var p = (r.top + r.height / 2 - vh / 2) / vh;
          L.el.style.transform = 'translate3d(0,' + (p * L.speed * 100).toFixed(2) + 'px,0)';
        });
      }

      // whichever scene centre sits nearest the viewport centre wins the dot
      if (dots.length) {
        var best = 0, bestD = Infinity;
        scenes.forEach(function (sc, i) {
          var r = sc.getBoundingClientRect();
          var d = Math.abs(r.top + r.height / 2 - vh / 2);
          if (d < bestD) { bestD = d; best = i; }
        });
        dots.forEach(function (d, i) { d.classList.toggle('on', i === best); });
      }

      if (nudge && window.pageYOffset > 40) {
        nudge.classList.add('gone');
        nudge = null;
      }
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    frame();
  }

  /* ───────────────────────────────────────── 4 · AMBIENT PETALS/EMBERS ─── */
  function spawnAmbient() {
    if (REDUCE) return;

    var petalBox = $('#petal-field');
    var emberBox = $('#ember-field');
    var narrow   = window.innerWidth < 760;
    var nPetals  = narrow ? 14 : 22;
    var nEmbers  = narrow ? 10 : 16;

    if (petalBox) {
      for (var i = 0; i < nPetals; i++) {
        var p = document.createElement('span');
        p.className = 'petal';
        p.style.left = (Math.random() * 100).toFixed(2) + '%';
        p.style.animationDuration = (11 + Math.random() * 12).toFixed(1) + 's';
        p.style.animationDelay = (-Math.random() * 20).toFixed(1) + 's';
        var sc = (0.55 + Math.random() * 0.75).toFixed(2);
        p.style.width = p.style.height = (9 * sc).toFixed(1) + 'px';
        petalBox.appendChild(p);
      }
    }

    if (emberBox) {
      for (var j = 0; j < nEmbers; j++) {
        var e = document.createElement('span');
        e.className = 'ember';
        e.style.left = (Math.random() * 100).toFixed(2) + '%';
        e.style.animationDuration = (14 + Math.random() * 14).toFixed(1) + 's';
        e.style.animationDelay = (-Math.random() * 25).toFixed(1) + 's';
        emberBox.appendChild(e);
      }
    }
  }

  /* ─────────────────────────────────────────────────── 5 · COUNTDOWN ─── */
  function initCountdown() {
    var iso = (INFO.event && INFO.event.time && INFO.event.time.startIso) || '2026-11-15T18:00:00+05:30';
    var target = new Date(iso).getTime();
    var cells = { d: $('#cd-d'), h: $('#cd-h'), m: $('#cd-m'), s: $('#cd-s') };
    if (!cells.d) return;

    var last = {};

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        cells.d.textContent = cells.h.textContent = cells.m.textContent = cells.s.textContent = '00';
        var note = $('.count-note');
        if (note) note.textContent = 'the day is here';
        return;
      }
      var s = Math.floor(diff / 1000);
      var vals = {
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60
      };
      Object.keys(vals).forEach(function (k) {
        var txt = k === 'd' ? String(vals[k]) : pad(vals[k]);
        if (last[k] === txt) return;
        last[k] = txt;
        cells[k].textContent = txt;
        if (!REDUCE) {
          cells[k].classList.remove('tick');
          void cells[k].offsetWidth;
          cells[k].classList.add('tick');
        }
      });
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ──────────────────────────────────────────── 6 · CALENDAR + SHARE ─── */
  function initLinks() {
    var cal = INFO.calendar || {};
    var calLink = $('#cal-link');
    if (calLink && cal.startDate) {
      calLink.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text='     + encodeURIComponent(cal.title || 'Engagement Ceremony')
        + '&dates='    + cal.startDate + '/' + cal.endDate
        + '&details='  + encodeURIComponent(cal.description || '')
        + '&location=' + encodeURIComponent(cal.location || '');
    }

    var waLink = $('#wa-link');
    if (waLink) {
      var msg = (INFO.rsvp && INFO.rsvp.whatsappShareText)
        || "Dr. Sasidharan & Dr. Abinaya's Engagement — 15 Nov 2026, Amman Sakthi Mahal, Thiruvarur. #LoveGotPrescribed";
      var url = (location.protocol === 'file:') ? '' : '\n' + location.href;
      waLink.href = 'https://wa.me/?text=' + encodeURIComponent(msg + url);
    }
  }

  /* ────────────────────────────────────────────── 7 · RING SPARKLE FX ─── */
  function initSparkle() {
    var spark = $('#ring-spark');
    var scene = $('#s-ring');
    if (!spark || !scene || REDUCE || !('IntersectionObserver' in window)) return;

    var timer = null;

    function flash() {
      spark.style.left = (34 + Math.random() * 32) + '%';
      spark.style.top  = (34 + Math.random() * 26) + '%';
      spark.classList.remove('flash');
      void spark.offsetWidth;
      spark.classList.add('flash');
    }

    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          flash();
          if (!timer) timer = setInterval(flash, 2600);
        } else if (timer) {
          clearInterval(timer); timer = null;
        }
      });
    }, { threshold: 0.3 }).observe(scene);
  }

  /* ───────────────────────────────────────────────────── 8 · MUSIC ─── */
  /* No floating control. The tap on "Open the Invitation" is the user
     gesture browsers require, so the music starts with the reveal. With no
     file at assets/audio/ this fails silently and nothing breaks. */
  function startMusic() {
    var audio = $('#track');
    if (!audio || REDUCE) return;
    audio.volume = 0.55;
    var p = audio.play();
    if (p && p.catch) p.catch(function () { /* no file, or blocked — stay quiet */ });
  }

  /* ───────────────────────────────────────────────────── 9 · THE GATE ─── */
  function initGate() {
    var gate = $('#gate');
    var key  = $('#gate-key');
    if (!gate) { document.body.classList.remove('is-locked'); return; }

    var opened = false;

    function open() {
      if (opened) return;
      opened = true;

      startMusic();

      // Two beats: the carved doors are summoned onto the plain surface,
      // and only then do they part. Nothing cuts across the opening screen
      // before the tap.
      var ARM = REDUCE ? 0 : 520;
      gate.classList.add('is-arming');

      setTimeout(function () {
        gate.classList.add('is-open');
        document.body.classList.remove('is-locked');
        document.body.classList.add('is-open');

        // the hero only starts once the doors are moving
        setTimeout(function () {
          var hero = $('#s-hero');
          if (hero) $$('[data-rv]', hero).forEach(function (el) { el.classList.add('rv-in'); });
        }, 420);

        setTimeout(function () { gate.remove(); }, 1800);
      }, ARM);
    }

    if (key) key.addEventListener('click', open);
    gate.addEventListener('click', open);
    gate.addEventListener('touchstart', open, { passive: true });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') open();
    });
    // never trap anyone: a scroll attempt also opens it
    window.addEventListener('wheel', open, { passive: true, once: true });

    if (REDUCE) open();
  }

  /* ────────────────────────────────────────────────────── 10 · BOOT ─── */
  function boot() {
    splitLetters(document);
    initReveals();
    initScrollFX();
    spawnAmbient();
    initCountdown();
    initLinks();
    initSparkle();
    initGate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
