/* The Skin BLVD — motion layer (GSAP + ScrollTrigger + SplitText + Lenis) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body, loader = $('#loader');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const done = () => { body.classList.remove('is-loading'); if (loader) loader.remove(); };

  if (reduce || !window.gsap || !window.ScrollTrigger) { done(); return; }

  try {
    document.documentElement.classList.add('js');
    gsap.registerPlugin(ScrollTrigger, ...(window.SplitText ? [SplitText] : []));
    const E = 'power4.out', E2 = 'expo.out';

    /* ---------- smooth scroll ---------- */
    let lenis = null;
    if (window.Lenis) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const id = a.getAttribute('href'); if (id.length < 2) return;
        const t = $(id); if (!t) return; e.preventDefault(); lenis.scrollTo(t, { offset: id === '#top' ? 0 : -70, duration: 1.4 });
      }));
    }

    /* ---------- nav hide on scroll down ---------- */
    const nav = $('#nav'); let lastY = 0;
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => {
      const y = s.scroll(); nav.classList.toggle('hide', y > 300 && y > lastY && !$('#links').classList.contains('open')); lastY = y;
    } });

    /* ---------- split helpers ---------- */
    const lines = el => new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'sl' }).lines;

    /* ---------- preloader → hero intro ---------- */
    const heroTitleLines = $$('#heroTitle .ln');
    // wrap each hero line's text so the line mask works
    heroTitleLines.forEach(l => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.innerHTML = l.innerHTML; l.innerHTML = ''; l.appendChild(s); });
    const intro = gsap.timeline({ paused: true })
      .from('#heroMedia', { clipPath: 'inset(18% 30% 18% 30%)', duration: 1.6, ease: 'expo.inOut' }, 0)
      .from('#heroMedia img', { scale: 1.35, duration: 2.2, ease: 'expo.out' }, 0)
      .from($$('#heroTitle .ln > span'), { yPercent: 110, duration: 1.4, stagger: .12, ease: E2 }, .55)
      .from('.hero-kicker span', { y: 20, opacity: 0, duration: 1, stagger: .08, ease: E2 }, .8)
      .from('.hero-lede, .hero-cta > *', { y: 24, opacity: 0, duration: 1.1, stagger: .08, ease: E2 }, 1)
      .from('.hero-bar', { opacity: 0, y: 14, duration: 1, ease: E2 }, 1.2)
      .from('.nav > *', { y: -20, opacity: 0, duration: 1, stagger: .05, ease: E2 }, 1.1)
      .add(() => { lenis && lenis.start(); ScrollTrigger.refresh(); }, 1.3);

    const cnt = { v: 0 }, countEl = $('#loadCount');
    const pre = gsap.timeline({ onComplete: () => { done(); if (!intro.isActive() && intro.progress() === 0) intro.play(); } })
      .from('.l-the', { opacity: 0, y: 10, duration: .6, ease: E })
      .from('.l-line', { scaleX: 0, duration: 1, ease: 'expo.inOut' }, '<.1')
      .from('.l-name span', { yPercent: 110, duration: 1, stagger: .1, ease: E2 }, '<.3')
      .from('.l-sub', { opacity: 0, letterSpacing: '.6em', duration: 1, ease: E }, '<.3')
      .to(cnt, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { countEl.textContent = Math.round(cnt.v); } }, 0)
      .to('.loader-mark', { y: -30, opacity: 0, duration: .6, ease: 'power3.in' }, '+=.15')
      .to('.loader-count', { opacity: 0, duration: .4 }, '<')
      .to('#loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=.15')
      .add(() => intro.play(), '<.35');
    // safety: never leave the loader up
    setTimeout(() => { if (document.body.contains(loader)) { pre.progress(1); } }, 6000);

    /* hero parallax out */
    gsap.to('#heroMedia img', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-inner', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* ---------- section headings: masked line reveal ---------- */
    $$('h2.split').forEach(h => {
      const ls = lines(h);
      gsap.from(ls, { yPercent: 105, duration: 1.3, stagger: .1, ease: E2, scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    $$('.label').forEach(l => gsap.from(l, { opacity: 0, x: -16, duration: 1, ease: E, scrollTrigger: { trigger: l, start: 'top 90%' } }));
    $$('.fade-up').forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: el, start: 'top 90%' } }));

    /* ---------- statement: words fill on scroll ---------- */
    const bq = $('#bigQuote');
    if (bq) {
      const words = new SplitText(bq, { type: 'words', wordsClass: 'w' }).words;
      gsap.to(words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: bq, start: 'top 78%', end: 'bottom 45%', scrub: true } });
    }
    $$('[data-count]').forEach(b => {
      const end = +b.dataset.count, dec = +(b.dataset.dec || 0), suf = b.dataset.suf || '', o = { v: 0 };
      gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 88%' }, onUpdate: () => { b.textContent = o.v.toFixed(dec) + suf; } });
    });
    gsap.from('.stat-row > div', { y: 40, opacity: 0, duration: 1.2, stagger: .1, ease: E, scrollTrigger: { trigger: '.stat-row', start: 'top 88%' } });

    /* ---------- treatments: horizontal pinned scroll (desktop) ---------- */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => {
      const track = $('#treatTrack');
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#treatPin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      $$('.t-panel').forEach(p => {
        gsap.fromTo(p.querySelector('.t-img img'), { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        gsap.from(p.querySelectorAll('.t-body > *, .t-body li'), { y: 30, opacity: 0, duration: 1, stagger: .05, ease: E, scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 75%' } });
      });
    });
    mm.add('(max-width: 1024px)', () => {
      $$('.t-panel').forEach(p => gsap.from(p, { y: 60, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: p, start: 'top 88%' } }));
    });

    /* ---------- image mask reveals ---------- */
    $$('.reveal-mask').forEach(m => {
      const img = m.querySelector('img');
      gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 80%' } })
        .from(m, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
        .from(img, { scale: 1.3, duration: 2, ease: E2 }, 0);
      gsap.to(img, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* ---------- this or that ---------- */
    window.__animVs = () => gsap.from('#vs > *', { y: 40, opacity: 0, duration: .9, stagger: .08, ease: E, clearProps: 'all' });
    ScrollTrigger.create({ trigger: '#vs', start: 'top 85%', once: true, onEnter: () => window.__animVs() });

    /* ---------- marquee band: auto + scroll velocity ---------- */
    const band = $('#band');
    if (band) {
      const loop = gsap.to(band, { xPercent: -33.333, duration: 28, ease: 'none', repeat: -1 });
      ScrollTrigger.create({ trigger: '.band', start: 'top bottom', end: 'bottom top', onUpdate: s => {
        const v = Math.min(Math.abs(s.getVelocity()) / 300, 5);
        gsap.to(loop, { timeScale: (s.direction < 0 ? -1 : 1) * (1 + v), duration: .3, overwrite: true });
        gsap.to(loop, { timeScale: s.direction < 0 ? -1 : 1, duration: 1.2, delay: .3 });
      } });
    }

    /* ---------- doctors list ---------- */
    gsap.from('.doc-list li', { y: 30, opacity: 0, duration: 1, stagger: .08, ease: E, scrollTrigger: { trigger: '.doc-list', start: 'top 85%' } });

    /* ---------- myths: strike-through draws, fact fades ---------- */
    $$('.myth').forEach(m => {
      gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 78%' } })
        .from(m, { y: 30, opacity: 0, duration: 1, ease: E })
        .to(m.querySelector('s'), { '--strike': '100%', duration: .9, ease: 'power2.inOut' }, '-=.4')
        .from(m.querySelector('.m-fact'), { y: 14, opacity: 0, duration: .8, ease: E }, '-=.3');
    });

    /* ---------- collage parallax + reveal ---------- */
    $$('.cl').forEach(c => {
      const sp = +c.dataset.speed || 0, img = c.querySelector('img');
      gsap.from(c.querySelector('.cl-img'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: c, start: 'top 88%' } });
      gsap.to(img, { scale: 1, duration: 2, ease: E2, scrollTrigger: { trigger: c, start: 'top 88%' } });
      mm.add('(min-width: 681px)', () => gsap.to(c, { yPercent: sp * -100, ease: 'none', scrollTrigger: { trigger: '.collage', start: 'top bottom', end: 'bottom top', scrub: true } }));
    });

    /* ---------- polaroids drop in ---------- */
    gsap.from('.pol', { y: 120, rotate: (i) => [-14, 10, -8][i] || 0, opacity: 0, duration: 1.6, stagger: .15, ease: E2, scrollTrigger: { trigger: '.pols', start: 'top 80%' } });

    /* ---------- finder / faq / branches ---------- */
    gsap.from('.concern', { y: 16, opacity: 0, duration: .7, stagger: .03, ease: E, scrollTrigger: { trigger: '.concerns', start: 'top 88%' } });
    gsap.from('.finder-out', { y: 50, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: '.finder-out', start: 'top 88%' } });

    /* ---------- CTA parallax ---------- */
    gsap.fromTo('.cta-media img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* ---------- footer word rises ---------- */
    const fw = $('.foot-word');
    if (fw) {
      const ch = new SplitText(fw, { type: 'chars', mask: 'chars' }).chars;
      gsap.from(ch, { yPercent: 100, duration: 1.3, stagger: .04, ease: E2, scrollTrigger: { trigger: fw, start: 'top 95%' } });
    }

    /* ---------- magnetic buttons ---------- */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.magnetic').forEach(b => {
        const xTo = gsap.quickTo(b, 'x', { duration: .6, ease: 'elastic.out(1,.4)' }), yTo = gsap.quickTo(b, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
        b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .4); });
        b.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
      });
    }

    /* pause smooth scroll while modal/chat are open */
    const watch = new MutationObserver(() => {
      const open = !$('#book').hidden;
      if (lenis) open ? lenis.stop() : (!$('#links').classList.contains('open') && lenis.start());
    });
    watch.observe($('#book'), { attributes: true, attributeFilter: ['hidden'] });

    addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  } catch (err) {
    console.error(err); document.documentElement.classList.remove('js'); done();
  }
})();
