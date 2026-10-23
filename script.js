/* ══════════════════════════════════════════════════════════════════════════
   SASI WEDS ABI — motion engine
   Self-contained: no CDN, no framework.
   Auto-navigation that hands control over the moment a guest touches the
   screen, a sideways story chapter, reveals, countdown, and floating
   controls that surface on touch.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var INFO   = window.INVITATION_INFO || {};
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ──────────────────────────────────────────────── 1 · REVEAL ENGINE ─── */
  function initReveals() {
    // the first scene waits for the cover to lift
    var held = $('#cover') ? '#s-names' : null;
    var pending = $$('[data-rv]').filter(function (el) {
      return !held || !el.closest(held);
    });

    $$('.scene').forEach(function (sc) {
      $$('[data-rv]', sc).forEach(function (el, i) {
        if (!el.style.transitionDelay) el.style.transitionDelay = (i * 0.1) + 's';
      });
    });

    if (REDUCE || !('IntersectionObserver' in window)) {
      $$('[data-rv]').forEach(function (el) { el.classList.add('rv-in'); });
      return;
    }

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('rv-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    pending.forEach(function (el) { io.observe(el); });

    // a fast flick can outrun the observer; sweep anything already passed
    function sweep() {
      var vh = window.innerHeight;
      pending = pending.filter(function (el) {
        if (el.classList.contains('rv-in')) return false;
        if (el.getBoundingClientRect().top < vh * 0.9) {
          el.classList.add('rv-in'); io.unobserve(el); return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onS);
    }
    var q = false;
    function onS() { if (q) return; q = true; requestAnimationFrame(function () { q = false; sweep(); }); }
    window.addEventListener('scroll', onS, { passive: true });
  }

  /* ──────────────────────────────────────── 2 · SCENERY + PETALS ─── */
  /* Clouds crossing the sky on long offset cycles. Negative delays mean the
     sky is already busy on arrival instead of starting empty. */
  function spawnSky() {
    if (REDUCE) return;
    var sky = $('#sky');
    if (!sky) return;
    var n = window.innerWidth < 760 ? 4 : 6;
    for (var i = 0; i < n; i++) {
      var c = document.createElement('span');
      c.className = 'cloud';
      var w = 36 + Math.random() * 44;            // vw
      c.style.width  = w + 'vw';
      c.style.height = (w * (0.26 + Math.random() * 0.14)) + 'vw';
      c.style.top    = (Math.random() * 42) + 'vh';
      c.style.animationDuration = (90 + Math.random() * 80).toFixed(0) + 's';
      c.style.animationDelay    = (-Math.random() * 150).toFixed(0) + 's';
      sky.appendChild(c);
    }
  }

  function spawnDrift() {
    if (REDUCE) return;
    var box = $('#drift');
    if (!box) return;
    var n = window.innerWidth < 760 ? 13 : 20;
    var kinds = ['pet--j', 'pet--j', 'pet--m', 'pet--v'];
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span');
      p.className = 'pet ' + kinds[i % kinds.length];
      p.style.left = (Math.random() * 100).toFixed(2) + '%';
      p.style.animationDuration = (13 + Math.random() * 13).toFixed(1) + 's';
      p.style.animationDelay = (-Math.random() * 24).toFixed(1) + 's';
      var s = (0.6 + Math.random() * 0.7);
      p.style.width = (10 * s).toFixed(1) + 'px';
      p.style.height = (7 * s).toFixed(1) + 'px';
      box.appendChild(p);
    }
  }

  /* ────────────────────────────────────────────────── 3 · COUNTDOWN ─── */
  function initCountdown() {
    var iso = (INFO.event && INFO.event.time && INFO.event.time.startIso) || '2026-11-15T18:00:00+05:30';
    var target = new Date(iso).getTime();
    var c = { d: $('#cd-d'), h: $('#cd-h'), m: $('#cd-m'), s: $('#cd-s') };
    if (!c.d) return;
    var last = {};
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) { Object.keys(c).forEach(function (k) { c[k].textContent = '00'; }); return; }
      var s = Math.floor(diff / 1000);
      var v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
      Object.keys(v).forEach(function (k) {
        var t = k === 'd' ? String(v[k]) : pad(v[k]);
        if (last[k] === t) return;
        last[k] = t; c[k].textContent = t;
        if (!REDUCE) { c[k].classList.remove('tick'); void c[k].offsetWidth; c[k].classList.add('tick'); }
      });
    }
    tick(); setInterval(tick, 1000);
  }

  /* ──────────────────────────────────────────── 4 · CALENDAR + SHARE ─── */
  function initLinks() {
    var cal = INFO.calendar || {};
    var a = $('#cal-link');
    if (a && cal.startDate) {
      a.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text='     + encodeURIComponent(cal.title || 'Engagement Ceremony')
        + '&dates='    + cal.startDate + '/' + cal.endDate
        + '&details='  + encodeURIComponent(cal.description || '')
        + '&location=' + encodeURIComponent(cal.location || '');
    }
    var w = $('#wa-link');
    if (w) {
      var msg = (INFO.rsvp && INFO.rsvp.whatsappShareText)
        || "Dr. Sasidharan & Dr. Abinaya's Engagement — 15 Nov 2026, Amman Sakthi Mahal, Thiruvarur. #LoveGotPrescribed";
      var url = (location.protocol === 'file:') ? '' : '\n' + location.href;
      w.href = 'https://wa.me/?text=' + encodeURIComponent(msg + url);
    }
  }

  /* ════════════════════════════════════════════════════════════════════
     5 · THE TOUR — auto-navigation
     Walks the story on its own, vertically between chapters and
     sideways through Our Story. The instant a guest scrolls, swipes or
     presses a key it stands down and never fights them for control.
     ════════════════════════════════════════════════════════════════════ */
  function Tour() {
    var scenes = $$('.scene');
    var strip  = $('#strip');
    var dots   = $$('#strip-dots b');
    var panels = $$('.panel');
    var rail   = $('#rail i');
    var ringEl = $('#ring-path');
    var btn    = $('#btn-auto');
    var veil   = $('#cloudveil');

    /* The pause asked for: two seconds of stillness AFTER the page has
       finished animating. The animation length is measured off the DOM
       rather than guessed, so a scene that takes longer to settle gets a
       correspondingly later departure. */
    var GAP = 2000;

    /* One flat itinerary of stops. Our Story contributes one stop per
       panel, so sideways movement is ordinary tour progress rather than a
       special case buried inside the step function - which is what kept
       breaking it. */
    var stops = [];
    scenes.forEach(function (sc, i) {
      if (sc.id === 's-story' && panels.length) {
        panels.forEach(function (_, p) { stops.push({ scene: i, panel: p }); });
      } else {
        stops.push({ scene: i, panel: null });
      }
    });

    var RING = 2 * Math.PI * 23.2;
    if (ringEl) { ringEl.style.strokeDasharray = RING; ringEl.style.strokeDashoffset = RING; }

    var at = 0;
    var running = false, timer = null, startedAt = 0, holdFor = 0, raf = null;
    var glide = null;
    var self = this;

    /* ---- how long is this stop's own animation? ------------------------ */
    function animMsOf(root, sel) {
      var max = 0;
      $$(sel || '[data-rv]', root).forEach(function (el) {
        var cs = getComputedStyle(el);
        var dly = Math.max.apply(null, (cs.transitionDelay || '0s').split(',').map(parseFloat).concat([0]));
        var dur = Math.max.apply(null, (cs.transitionDuration || '0s').split(',').map(parseFloat).concat([0]));
        max = Math.max(max, (dly + dur) * 1000);
      });
      return max;
    }
    function holdAt(stop) {
      if (stop.panel === null) {
        return Math.round(animMsOf(scenes[stop.scene])) + GAP;
      }
      // a panel's parts animate off the .on class rather than data-rv
      return Math.round(animMsOf(panels[stop.panel],
        '.print, .panel-no, .panel-ttl, .panel-txt')) + GAP;
    }

    /* ---- the cloud pass ------------------------------------------------ */
    function clouds(on) {
      if (!veil || REDUCE) return;
      veil.classList.toggle('pass', !!on);
    }

    /* ---- glide ---------------------------------------------------------
       Native smooth scrolling is cancelled outright inside a mandatory
       snap container, so the tour animates the scroll itself with snap
       switched off for the duration. A sine ease keeps it floating rather
       than darting. */
    function easeFloat(p) { return 0.5 - Math.cos(p * Math.PI) / 2; }

    function glideTo(el, to, dur, done) {
      cancelAnimationFrame(glide);
      var horiz = !!el;
      var from = horiz ? el.scrollLeft : window.pageYOffset;
      var delta = to - from;
      if (Math.abs(delta) < 1) { done && done(); return; }

      var host = horiz ? el : document.documentElement;
      var prev = host.style.scrollSnapType;
      host.style.scrollSnapType = 'none';
      var t0 = performance.now();
      clouds(true);

      function tick(now) {
        var p = Math.min(1, (now - t0) / dur);
        var v = from + delta * easeFloat(p);
        if (horiz) { el.scrollLeft = v; } else { window.scrollTo(0, v); }
        if (p < 1) {
          glide = requestAnimationFrame(tick);
        } else {
          host.style.scrollSnapType = prev || (horiz ? 'x mandatory' : '');
          clouds(false);
          done && done();
        }
      }
      glide = requestAnimationFrame(tick);
    }
    this.cancelGlide = function () { cancelAnimationFrame(glide); clouds(false); };

    /* ---- marking the live panel so its animation can play -------------- */
    function markPanel(i) {
      panels.forEach(function (pn, n) { pn.classList.toggle('on', n === i); });
      dots.forEach(function (d, n) { d.classList.toggle('on', n === i); });
    }
    this.markPanel = markPanel;

    /* ---- hold countdown ring ------------------------------------------- */
    function setRing(p) { if (ringEl) { ringEl.style.strokeDashoffset = RING * (1 - p); } }
    function frame() {
      if (!running) return;
      var p = holdFor ? Math.min(1, (Date.now() - startedAt) / holdFor) : 0;
      setRing(p);
      raf = requestAnimationFrame(frame);
    }
    function schedule(ms) {
      clearTimeout(timer);
      holdFor = ms; startedAt = Date.now();
      setRing(0);
      cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
      timer = setTimeout(advance, ms);
    }

    /* ---- travel to a stop, then wait out its animation plus the gap ---- */
    function travel(i, instant) {
      at = Math.max(0, Math.min(stops.length - 1, i));
      var stop = stops[at];
      var sc = scenes[stop.scene];

      function settled() {
        if (stop.panel !== null) markPanel(stop.panel);
        if (!running) return;
        schedule(holdAt(stop));
      }

      var needV = Math.abs(window.pageYOffset - sc.offsetTop) > 2;

      if (instant) {
        window.scrollTo(0, sc.offsetTop);
        if (strip && stop.panel !== null) { strip.scrollLeft = strip.clientWidth * stop.panel; }
        settled();
        return;
      }

      if (needV) {
        // entering Our Story always begins at the first panel
        if (sc.id === 's-story' && strip) { strip.scrollLeft = 0; markPanel(0); }
        glideTo(null, sc.offsetTop, 1700, function () {
          if (strip && stop.panel) { glideTo(strip, strip.clientWidth * stop.panel, 1200, settled); }
          else { settled(); }
        });
      } else if (strip && stop.panel !== null) {
        glideTo(strip, strip.clientWidth * stop.panel, 1200, settled);
      } else {
        settled();
      }
    }

    function advance() {
      if (!running) return;
      if (at >= stops.length - 1) { self.stop(); return; }
      travel(at + 1);
    }

    /* ---- public --------------------------------------------------------- */
    this.start = function () {
      if (REDUCE || running) return;
      running = true;
      if (btn) btn.classList.remove('off');
      at = 0;
      markPanel(0);
      schedule(holdAt(stops[0]));
    };

    this.stop = function () {
      running = false;
      clearTimeout(timer); cancelAnimationFrame(raf);
      setRing(0); clouds(false);
      if (btn) btn.classList.add('off');
    };

    this.resume = function () {
      if (REDUCE) return;
      var vh = window.innerHeight, best = 0, bd = Infinity;
      scenes.forEach(function (s, i) {
        var r = s.getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - vh / 2);
        if (d < bd) { bd = d; best = i; }
      });
      var pn = (strip && scenes[best].id === 's-story')
        ? Math.round(strip.scrollLeft / strip.clientWidth) : null;
      for (var i = 0; i < stops.length; i++) {
        if (stops[i].scene === best && (pn === null || stops[i].panel === pn)) { at = i; break; }
      }
      running = true;
      if (btn) btn.classList.remove('off');
      schedule(holdAt(stops[at]));
    };

    this.toggle = function () { if (running) { self.stop(); } else { self.resume(); } };
    this.isRunning = function () { return running; };

    /* ---- the guest takes over ------------------------------------------ */
    var surrendered = false;
    function surrender() {
      if (surrendered || !running) return;
      surrendered = true;
      self.cancelGlide();
      document.documentElement.style.scrollSnapType = '';
      self.stop();
    }
    ['wheel', 'touchmove', 'keydown', 'mousedown'].forEach(function (ev) {
      window.addEventListener(ev, surrender, { passive: true });
    });
    if (btn) btn.addEventListener('mousedown', function (e) { e.stopPropagation(); });

    /* ---- keep dots and panel marks honest however the strip moved ------ */
    if (strip) {
      var sq = false;
      strip.addEventListener('scroll', function () {
        if (sq) return; sq = true;
        requestAnimationFrame(function () {
          sq = false;
          markPanel(Math.round(strip.scrollLeft / strip.clientWidth));
        });
      }, { passive: true });
    }

    /* ---- progress rail -------------------------------------------------- */
    function setRail() {
      if (!rail) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      rail.style.width = (max > 0 ? Math.min(100, Math.max(0, window.pageYOffset / max * 100)) : 0) + '%';
    }
    window.addEventListener('scroll', setRail, { passive: true });
    setRail();
  }

  /* ═══════════════════════════════════════ 6 · FLOATING CONTROLS ─── */
  /* Hidden by default. A touch or a move anywhere brings them back, then
     they fade out again so nothing sits on top of the artwork. */
  function initHud(tour) {
    var hud   = $('#hud');
    var mute  = $('#btn-mute');
    var auto  = $('#btn-auto');
    var audio = $('#track');
    if (!hud) return;

    var hideTimer = null;
    function show() {
      hud.classList.add('show');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { hud.classList.remove('show'); }, 3200);
    }
    // any contact with the screen summons them
    ['touchstart', 'pointerdown', 'mousemove', 'wheel', 'keydown'].forEach(function (ev) {
      window.addEventListener(ev, show, { passive: true });
    });
    hud.addEventListener('pointerenter', function () { clearTimeout(hideTimer); });
    hud.addEventListener('pointerleave', show);

    if (mute && audio) {
      mute.addEventListener('click', function () {
        audio.muted = !audio.muted;
        mute.classList.toggle('off', audio.muted);
        mute.setAttribute('aria-label', audio.muted ? 'Unmute music' : 'Mute music');
        show();
      });
    }

    if (auto && tour) {
      auto.addEventListener('click', function () {
        tour.toggle();
        auto.setAttribute('aria-label', tour.isRunning() ? 'Pause auto-play' : 'Resume auto-play');
        show();
      });
    }

    return { show: show };
  }

  /* ──────────────────────────────────────────────────── 7 · MUSIC ─── */
  function startMusic() {
    var a = $('#track');
    if (!a || REDUCE) return;
    a.volume = 0;
    var p = a.play();
    if (p && p.catch) p.catch(function () {});
    // ease it in rather than starting at full level
    var vol = 0, target = 0.5;
    var fade = setInterval(function () {
      vol += 0.02;
      if (vol >= target) { vol = target; clearInterval(fade); }
      try { a.volume = vol; } catch (e) { clearInterval(fade); }
    }, 90);
  }

  /* ══════════════════════════════════════ 7b · STORY RAIL ═══════════
     Inside Our Story a scroll moves the page sideways. Only once the last
     panel is reached does the gesture go back to moving the page down —
     and scrolling up from panel 0 releases upward the same way. */
  function initStoryRail() {
    var strip = $('#strip');
    var scene = $('#s-story');
    if (!strip || !scene) return;

    var EDGE = 3;                 // px tolerance at either end
    var lock = false;

    function maxLeft() { return strip.scrollWidth - strip.clientWidth; }
    function centred() {
      var r = scene.getBoundingClientRect();
      return Math.abs(r.top + r.height / 2 - window.innerHeight / 2) < window.innerHeight * 0.35;
    }
    function canTake(dy) {
      if (!centred()) return false;
      var l = strip.scrollLeft, m = maxLeft();
      if (m <= 0) return false;
      if (dy > 0) return l < m - EDGE;     // still room to the right
      return l > EDGE;                     // still room to the left
    }

    strip.style.scrollSnapType = 'x mandatory';

    window.addEventListener('wheel', function (e) {
      var dy = e.deltaY;
      if (!canTake(dy)) return;
      e.preventDefault();
      if (lock) return;
      lock = true;
      var i = Math.round(strip.scrollLeft / strip.clientWidth) + (dy > 0 ? 1 : -1);
      i = Math.max(0, Math.min(2, i));
      railGlide(strip, i * strip.clientWidth, 700, function () { lock = false; });
    }, { passive: false });

    // touch: same rule, driven by the swipe's dominant axis
    var sy = 0, sx = 0, active = false;
    window.addEventListener('touchstart', function (e) {
      if (!e.touches.length) return;
      sy = e.touches[0].clientY; sx = e.touches[0].clientX; active = true;
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      if (!active || !e.touches.length || lock) return;
      var dy = sy - e.touches[0].clientY;
      var dx = sx - e.touches[0].clientX;
      // a vertical swipe inside the story still pages sideways
      var d = Math.abs(dy) > Math.abs(dx) ? dy : dx;
      if (Math.abs(d) < 28) return;
      if (!canTake(d)) return;
      e.preventDefault();
      active = false; lock = true;
      var i = Math.round(strip.scrollLeft / strip.clientWidth) + (d > 0 ? 1 : -1);
      i = Math.max(0, Math.min(2, i));
      railGlide(strip, i * strip.clientWidth, 700, function () { lock = false; });
    }, { passive: false });

    window.addEventListener('touchend', function () { active = false; }, { passive: true });
  }

  /* a small standalone glide, shared by the rail */
  function railGlide(el, to, dur, done) {
    var from = el.scrollLeft, d = to - from, t0 = performance.now();
    var prev = el.style.scrollSnapType;
    el.style.scrollSnapType = 'none';
    function tick(now) {
      var p = Math.min(1, (now - t0) / dur);
      var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.scrollLeft = from + d * e;
      if (p < 1) requestAnimationFrame(tick);
      else { el.style.scrollSnapType = prev || 'x mandatory'; done && done(); }
    }
    requestAnimationFrame(tick);
  }

  /* ─────────────────────────────────── 7c · THE OPENING FLOURISH ─── */
  function playOpening() {
    if (REDUCE) return;
    var burst = document.createElement('span');
    burst.className = 'burst';
    document.body.appendChild(burst);
    void burst.offsetWidth;          // forced reflow: starts the animation
    burst.classList.add('go');       // without waiting on a frame callback
    setTimeout(function () { burst.remove(); }, 1700);

    var n = window.innerWidth < 760 ? 18 : 28;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var m = document.createElement('span');
        m.className = 'mote';
        var ang = (Math.PI * 2 * i) / n + Math.random() * 0.4;
        var dist = 120 + Math.random() * 260;
        m.style.setProperty('--mx', Math.cos(ang) * dist + 'px');
        m.style.setProperty('--my', Math.sin(ang) * dist + 'px');
        m.style.setProperty('--ms', (0.4 + Math.random() * 1.1).toFixed(2));
        m.style.animationDelay = (Math.random() * 0.22).toFixed(2) + 's';
        document.body.appendChild(m);
        void m.offsetWidth;
        m.classList.add('go');
        setTimeout(function () { m.remove(); }, 2400);
      })(i);
    }
  }

  /* ──────────────────────────────────────────────────── 8 · COVER ─── */
  function initCover(tour, hud) {
    var cover = $('#cover');
    var btn   = $('#open-btn');
    if (!cover) { document.body.classList.remove('is-locked'); return; }

    var opened = false;
    function open() {
      if (opened) return;
      opened = true;

      startMusic();
      playOpening();
      cover.classList.add('is-opening');
      document.body.classList.add('is-opening');
      setTimeout(function () { cover.classList.add('is-gone'); }, 420);
      document.body.classList.remove('is-locked');
      document.body.classList.add('is-open');
      setTimeout(function () { document.body.classList.remove('is-opening'); }, 2600);

      setTimeout(function () {
        $$('#s-names [data-rv]').forEach(function (el) { el.classList.add('rv-in'); });
      }, 300);

      setTimeout(function () { cover.remove(); }, 1400);

      // let the first scene land, then begin the tour
      // just long enough for the opening flourish to clear, so the first
      // scene gets the same beat as every other one
      setTimeout(function () { if (tour) tour.start(); }, 1300);
      if (hud) setTimeout(hud.show, 1500);
    }

    if (btn) btn.addEventListener('click', open);
    cover.addEventListener('click', open);
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') open();
    });
    if (REDUCE) open();
  }

  /* ─────────────────────────────── 8b · OUR STORY ALWAYS STARTS AT 1 ─── */
  /* Whenever the story scene leaves the screen it rewinds to the first
     panel, so it is never re-entered half-told - on a refresh, on a jump
     from the dots, or when the tour comes back round. Rewinding on exit
     rather than on entry means it never yanks under a guest who is in the
     middle of paging through it. */
  function resetStoryOnExit(tour) {
    var scene = $('#s-story');
    var strip = $('#strip');
    if (!scene || !strip || !('IntersectionObserver' in window)) return;

    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) return;
        strip.scrollLeft = 0;
        if (tour && tour.markPanel) tour.markPanel(0);
      });
    }, { threshold: 0.05 }).observe(scene);
  }

  /* ───────────────────────────────────────────────────── 9 · BOOT ─── */
  function boot() {
    // Browsers restore the previous scroll position on reload, which would
    // drop a returning guest halfway through the story behind the cover.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    var strip0 = $('#strip');
    if (strip0) strip0.scrollLeft = 0;
    window.addEventListener('load', function () {
      window.scrollTo(0, 0);
      if (strip0) strip0.scrollLeft = 0;
    });

    initReveals();
    spawnSky();
    spawnDrift();
    initCountdown();
    initLinks();
    var tour = new Tour();
    var hud  = initHud(tour);
    initStoryRail();
    if (tour && tour.markPanel) tour.markPanel(0);
    resetStoryOnExit(tour);
    initCover(tour, hud);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
