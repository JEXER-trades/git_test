/* ALBGYM — lightweight progressive enhancement (no dependencies) */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  /* ---------- Header: compact on scroll, hide on fast scroll down ---------- */
  const hdr = $('[data-header]');
  const mbar = $('[data-mbar]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (hdr) {
      hdr.classList.toggle('is-scrolled', y > 40);
      const menuOpen = document.body.classList.contains('menu-open');
      hdr.classList.toggle('is-hidden', !menuOpen && y > 600 && y > lastY + 4);
      if (y < lastY - 4) hdr.classList.remove('is-hidden');
    }
    if (mbar) mbar.classList.toggle('is-visible', y > window.innerHeight * 0.6);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = $('[data-burger]');
  const menu = $('[data-menu]');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    $('.sr', burger).textContent = open ? 'Menü schließen' : 'Menü öffnen';
    document.body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      $$('.menu__list > li', menu).forEach((li, i) => (li.style.transitionDelay = `${0.04 * i + 0.1}s`));
      hdr.classList.add('is-scrolled');
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 450);
      onScroll();
    }
  };
  if (burger && menu) {
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); burger.focus(); } });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  }

  /* ---------- Desktop dropdown toggles (keyboard / touch) ---------- */
  $$('.nav__toggle').forEach((t) => {
    const li = t.closest('.nav__has');
    t.addEventListener('click', () => {
      const open = !li.classList.contains('is-open');
      $$('.nav__has.is-open').forEach((x) => { x.classList.remove('is-open'); $('.nav__toggle', x).setAttribute('aria-expanded', 'false'); });
      li.classList.toggle('is-open', open);
      t.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav__has')) $$('.nav__has.is-open').forEach((x) => { x.classList.remove('is-open'); $('.nav__toggle', x).setAttribute('aria-expanded', 'false'); }); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.nav__has.is-open').forEach((x) => { x.classList.remove('is-open'); const t = $('.nav__toggle', x); t.setAttribute('aria-expanded', 'false'); t.focus(); }); });

  /* ---------- Headline line split for reveal ---------- */
  $$('.reveal-lines').forEach((el) => {
    if (el.dataset.split) return;
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map((p, i) => `<span class="ln" style="--i:${i}"><span>${p.trim()}</span></span>`).join('');
    el.dataset.split = '1';
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal, .reveal-img, .reveal-lines');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add('is-in'));

  /* ---------- Gentle parallax ---------- */
  const px = $$('[data-parallax]');
  if (px.length && !reduced) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      px.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(-p * 6).toFixed(2)}%, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Opening hours: highlight today + live state ---------- */
  const now = new Date();
  const dow = ((now.getDay() + 6) % 7) + 1; // 1 = Mo
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const HOURS = { 1: [['08:00', '21:30']], 3: [['08:00', '21:30']], 5: [['08:00', '21:30']], 2: [['09:00', '12:00'], ['16:00', '21:30']], 4: [['09:00', '12:00'], ['16:00', '21:30']], 6: [['13:00', '17:00']], 7: [['09:00', '14:00']] };
  $$('[data-hours] .hours__row').forEach((row) => { if (row.dataset.dow.split(',').map(Number).includes(dow)) row.classList.add('is-today'); });
  const today = HOURS[dow] || [];
  const openSlot = today.find(([a, b]) => mins >= toMin(a) && mins < toMin(b));
  const nextSlot = today.find(([a]) => mins < toMin(a));
  const stateText = openSlot ? `Jetzt geöffnet · bis ${openSlot[1]} Uhr` : nextSlot ? `Aktuell geschlossen · öffnet heute um ${nextSlot[0]} Uhr` : 'Aktuell geschlossen';
  $$('[data-open-state]').forEach((el) => { el.innerHTML = `<span class="status-dot${openSlot ? ' is-open' : ''}" aria-hidden="true"></span>${stateText}`; });

  /* ---------- Testimonials carousel ---------- */
  $$('[data-track]').forEach((track) => {
    const wrap = track.closest('section');
    $$('[data-scroll]', wrap).forEach((b) => b.addEventListener('click', () => {
      const card = track.firstElementChild;
      const step = card ? card.getBoundingClientRect().width + 24 : 320;
      track.scrollBy({ left: step * Number(b.dataset.scroll), behavior: reduced ? 'auto' : 'smooth' });
    }));
  });

  /* ---------- Health list hover image ---------- */
  $$('[data-health]').forEach((sec) => {
    const frames = $$('.health__frame .pic', sec);
    $$('.hitem a', sec).forEach((a, i) => {
      const show = () => frames.forEach((f, j) => f.classList.toggle('is-active', j === i));
      a.addEventListener('mouseenter', show);
      a.addEventListener('focus', show);
    });
  });

  /* ---------- Timetable: day tabs + category filter ---------- */
  $$('[data-tt]').forEach((tt) => {
    const tabs = $$('.tt__day', tt);
    const cols = $$('.tt__col', tt);
    const select = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      cols.forEach((c, j) => c.classList.toggle('is-active', i === j));
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') select((i + 1) % tabs.length, true);
        if (e.key === 'ArrowLeft') select((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    const todayIdx = Math.min(dow - 1, tabs.length - 1);
    if (tabs.length) select(todayIdx >= 0 ? todayIdx : 0);
    const fbtns = $$('.fbtn', tt);
    fbtns.forEach((b) => b.addEventListener('click', () => {
      fbtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const cat = b.dataset.cat;
      $$('.slot[data-cat]', tt).forEach((s) => s.classList.toggle('is-dim', cat !== 'all' && s.dataset.cat !== cat));
    }));
  });

  /* ---------- Forms ---------- */
  const params = new URLSearchParams(location.search);
  const msgs = {
    required: 'Bitte fülle dieses Feld aus.',
    email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    tel: 'Bitte gib eine gültige Telefonnummer ein.',
    consent: 'Bitte bestätige die Einwilligung, damit wir deine Anfrage bearbeiten dürfen.',
    date: 'Bitte wähle ein Datum ab morgen.',
  };
  let tokenPromise = null;
  const getToken = () => (tokenPromise ||= fetch('/api/anfrage.php?token=1', { credentials: 'same-origin' }).then((r) => (r.ok ? r.json() : null)).catch(() => null));

  $$('form[data-form]').forEach((form) => {
    $('[data-page]', form).value = location.pathname;
    // Prefill from query string (?angebot=…, ?betreff=…)
    const offerSel = $('select[name="angebot"]', form);
    const offerMap = { schnupper: '4-Wochen-Schnupper-Abo', pt: 'Personal Training', jugend: 'Jugendtraining', figur: 'Figur & Ernährung', ruecken: 'Gesundheit & Rücken' };
    if (offerSel && offerMap[params.get('angebot')]) offerSel.value = offerMap[params.get('angebot')];
    const goalMap = { ruecken: 'Rücken & Gesundheit', kurse: 'Kurse', abnehmen: 'Abnehmen & Figur', egym: 'EGYM & Gerätetraining' };
    const goal = goalMap[params.get('ziel')];
    if (goal) $$('input[name="interessen[]"]', form).forEach((c) => { if (c.value === goal) c.checked = true; });
    const subj = $('input[name="betreff"]', form);
    if (subj && params.get('betreff')) subj.value = params.get('betreff').slice(0, 120);
    const date = $('input[type="date"]', form);
    if (date) { const t = new Date(Date.now() + 864e5); date.min = t.toISOString().slice(0, 10); }
    form.addEventListener('focusin', () => getToken().then((t) => { if (t && t.token) $('[data-ts]', form).value = t.token; }), { once: true });

    const setErr = (el, msg) => {
      const err = document.getElementById(`${el.id}-err`);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg || '';
    };
    const validate = (el) => {
      if (el.type === 'checkbox' && el.required) { setErr(el, el.checked ? '' : msgs.consent); return el.checked; }
      const v = el.value.trim();
      let m = '';
      if (el.required && !v) m = msgs.required;
      else if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = msgs.email;
      else if (v && el.type === 'tel' && !/^[+()\d\s/-]{6,}$/.test(v)) m = msgs.tel;
      else if (v && el.type === 'date' && el.min && v < el.min) m = msgs.date;
      setErr(el, m);
      return !m;
    };
    const fields = $$('input[id], select[id], textarea[id]', form);
    fields.forEach((el) => el.addEventListener('blur', () => { if (el.value || el.getAttribute('aria-invalid')) validate(el); }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form__status', form);
      const bad = fields.filter((el) => !validate(el));
      if (bad.length) { bad[0].focus(); return; }
      if (window.ALBGYM_PREVIEW) {
        form.classList.add('is-done');
        status.className = 'form__status is-ok';
        status.innerHTML = '<strong>Vorschau – es wurde nichts gesendet.</strong>Deine Angaben sind gültig. Auf albgym.de geht die Anfrage an dieser Stelle direkt an das ALBGYM-Team.';
        status.focus();
        return;
      }
      form.classList.add('is-sending');
      status.className = 'form__status';
      status.innerHTML = 'Wird gesendet …';
      const t = await getToken();
      if (t && t.token) $('[data-ts]', form).value = t.token;
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          form.classList.add('is-done');
          status.classList.add('is-ok');
          status.innerHTML = `<strong>Vielen Dank${data.name ? ', ' + data.name.replace(/[<>&"]/g, '') : ''}!</strong>${data.message || 'Deine Anfrage ist bei uns eingegangen. Wir melden uns in Kürze persönlich bei dir.'}`;
          if (window._paq) window._paq.push(['trackEvent', 'Formular', form.dataset.form, 'gesendet']);
        } else {
          (data.errors ? Object.entries(data.errors) : []).forEach(([name, msg]) => { const el = form.elements[name]; if (el && el.id) setErr(el, msg); });
          status.classList.add('is-err');
          status.innerHTML = `<strong>Das hat leider nicht geklappt.</strong>${data.message || 'Bitte prüfe deine Angaben oder ruf uns direkt an: <a href="tel:+4976721001">07672 1001</a>.'}`;
        }
      } catch {
        status.classList.add('is-err');
        status.innerHTML = '<strong>Keine Verbindung.</strong>Bitte versuche es erneut oder ruf uns an: <a href="tel:+4976721001">07672 1001</a> · <a href="mailto:info@albgym.de">info@albgym.de</a>';
      }
      form.classList.remove('is-sending');
      status.focus();
    });
  });

  /* ---------- Consent manager (Google Maps, Matomo) ---------- */
  const KEY = 'albgym-consent-v1';
  const box = $('[data-consent]');
  const cfg = window.ALBGYM_ANALYTICS || null; // { matomoUrl, siteId } — set in /js/config.js when Matomo is in use
  if (!cfg) $$('[data-analytics-option]').forEach((el) => el.remove());
  const needsBanner = !!cfg; // Without analytics, nothing is loaded before an explicit click (2-click map).
  let consent = store.get(KEY);
  const apply = () => {
    if (consent && consent.media) $$('[data-map]').forEach(loadMap);
    if (consent && consent.stats && cfg && !window._paq) {
      window._paq = [['disableCookies'], ['trackPageView'], ['enableLinkTracking'], ['setTrackerUrl', cfg.matomoUrl + 'matomo.php'], ['setSiteId', String(cfg.siteId)]];
      const s = document.createElement('script'); s.async = true; s.src = cfg.matomoUrl + 'matomo.js'; document.head.appendChild(s);
    }
  };
  const save = (c) => { consent = { ...c, at: Date.now() }; store.set(KEY, consent); box.hidden = true; apply(); };
  const openBox = () => {
    const f = $('[data-consent-form]', box);
    if (consent) { f.elements.media.checked = !!consent.media; if (f.elements.stats) f.elements.stats.checked = !!consent.stats; }
    box.hidden = false;
    $('button, input:not([disabled])', box).focus();
  };
  if (box) {
    $('[data-consent-form]', box).addEventListener('submit', (e) => { e.preventDefault(); const f = e.target; save({ media: f.elements.media.checked, stats: f.elements.stats ? f.elements.stats.checked : false }); });
    $('[data-consent-all]', box).addEventListener('click', () => save({ media: true, stats: true }));
    $('[data-consent-deny]', box).addEventListener('click', () => save({ media: false, stats: false }));
    $$('[data-consent-open]').forEach((b) => b.addEventListener('click', openBox));
    if (!consent && needsBanner) box.hidden = false;
    apply();
  }
  function loadMap(el) {
    if (el.dataset.loaded) return;
    el.dataset.loaded = '1';
    const f = document.createElement('iframe');
    f.src = el.dataset.map; f.title = 'Google Maps: Anfahrt zum ALBGYM'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    el.appendChild(f);
    const ph = $('.map__ph', el); if (ph) ph.remove();
  }
  $$('[data-map-load]').forEach((b) => b.addEventListener('click', () => {
    const remember = $('#map-remember');
    if (remember && remember.checked) save({ ...(consent || {}), media: true });
    loadMap(b.closest('[data-map]'));
  }));

  /* ---------- Soft page transitions for internal links ---------- */
  if (!reduced) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || /\.(pdf|jpg|png|zip)$/i.test(url.pathname) || a.hasAttribute('download')) return;
      e.preventDefault();
      document.documentElement.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 220);
    });
    window.addEventListener('pageshow', () => document.documentElement.classList.remove('is-leaving'));
  }
})();
