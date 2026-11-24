(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MSGR = 'https://m.me/theskinblvdph';
  const BR = {
    Makati: { name: 'Makati', phone: '09277704026', disp: '0927 770 4026', addr: '2F Colbella Arcade, 910 Antonio Arnaiz Ave., San Lorenzo, Makati City' },
    QC: { name: 'Quezon City', phone: '09683203762', disp: '0968 320 3762', addr: 'GF Symphony Towers I, Sgt. Esguerra cor. Timog Ave., Quezon City' }
  };

  /* ===== Treatments (named and described from The Skin BLVD's own posts) ===== */
  const CATS = [
    { id: 'lift', tab: 'Lifting & contour', img: 'p-lift', cap: 'Lift, tighten and define.', capS: 'Liftera A2, HIFU and Exilis', items: [
      ['Liftera A2', 'New-generation HIFU with two handpieces: a line handpiece for broader areas and a pen handpiece for facial curves.', ['Face', 'Jawline']],
      ['HIFU', 'Focused ultrasound energy that targets deeper tissue layers to lift and tighten.', ['Lifting']],
      ['Exilis', 'Radiofrequency heating with ultrasound for firmer-looking skin on selected face and body areas.', ['Face', 'Body']]] },
    { id: 'tox', tab: 'Botox', img: 'p-tox', cap: 'More than smoothing wrinkles.', capS: 'From your brows to your jawline', items: [
      ['Jawtox', 'Targets enlarged masseter muscles to soften a square jaw and create a slimmer lower face.', ['Jawline', 'Clenching']],
      ['Nefertiti Lift', 'Targets the platysma muscles to improve jawline definition and soften visible neck bands.', ['Jawline', 'Neck']],
      ['Botox', 'From brows to jawline, many areas can be lifted and smoothed after a doctor’s assessment.', ['Face']],
      ['Traptox', 'Botox for stubborn muscle tension in the shoulders.', ['Shoulders']],
      ['Lip Flip', 'A subtle lift: relaxes the lip muscle for a natural flip and soft curl.', ['Lips']]] },
    { id: 'fill', tab: 'Lips & boosters', img: 'p-fill', cap: 'Juicy, hydrated, naturally you.', capS: 'Fillers and skin boosters', items: [
      ['Lip Fillers', 'Added volume and a defined shape: balanced, natural-looking fuller lips.', ['Lips']],
      ['Skinfill Bacio Lip Booster', 'Hydration, smoother texture and naturally juicy-looking lips, without the overfilled look.', ['Lips']],
      ['Rejuran I', 'Under-eye skin booster for a smoother, hydrated, refreshed look.', ['Under-eyes']],
      ['Luhilo Classic', 'HA, peptides and amino acids for dry, dull, dehydrated skin that needs hydration and glow.', ['Glow']],
      ['Luhilo Snow', 'HA, peptides and amino acids plus glutathione, niacinamide and arbutin for a brighter, more even look.', ['Brightening']],
      ['NCTF Skin Booster', 'Improves hydration, texture and overall skin quality. One of Doc Erin’s favorites.', ['Glow']]] },
    { id: 'laser', tab: 'Lasers', img: 'p-laser', cap: 'Different lasers, different goals.', capS: 'Let our doctors find your match', items: [
      ['PicoSure', 'For pigmentation and skin rejuvenation: sunspots, acne marks, uneven tone, fine lines and texture.', ['Pigment', 'Tattoo removal']],
      ['GentleMax Pro', 'Dual-wavelength laser with advanced cooling for long-term hair reduction: face, underarms, legs, arms, bikini.', ['Hair removal']],
      ['CO2 Laser', 'Resurfacing that stimulates skin renewal and collagen remodeling for acne scars and rough texture.', ['Acne scars']]] },
    { id: 'skin', tab: 'Skin renewal', img: 'p-skin', cap: 'Great skin starts beneath the surface.', capS: 'SkinPen, BioRePeel and HydraFacial', items: [
      ['SkinPen Microneedling', 'Stimulates collagen and elastin to help with enlarged pores, acne scars, uneven tone and fine lines.', ['Texture', 'Scars']],
      ['BioRePeel', 'A skin renewal peel, often paired with PicoSure for scars and smoother-looking skin.', ['Renewal']],
      ['HydraFacial', 'For texture, clogged pores and dullness: the glass-skin glow facial.', ['Pores', 'Glow']]] },
    { id: 'body', tab: 'Body & fat', img: 'p-body', cap: 'Stubborn areas that won’t budge?', capS: 'Non-surgical contouring', items: [
      ['Lemon Bottle', 'Injectable for targeted, non-surgical contouring of the double chin, arms, abdomen, thighs and more.', ['Double chin', 'Arms', 'Tummy']],
      ['Mesolipo', 'Targets stubborn fat in areas like the arms and tummy.', ['Arms', 'Tummy']],
      ['Exilis for body', 'Radiofrequency and ultrasound for smoother, firmer-looking skin, including cellulite concerns.', ['Body']]] }
  ];
  const ALL = CATS.flatMap(c => c.items.map(([n, d]) => ({ n, d, cat: c.tab })));
  let catI = 0;
  $('#tabs').innerHTML = CATS.map((c, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-t="${i}">${esc(c.tab)}</button>`).join('');
  const renderCat = () => {
    const c = CATS[catI];
    $$('.tab').forEach((b, i) => b.setAttribute('aria-selected', String(i === catI)));
    const mi = $('#menuImg'); mi.style.animation = 'none'; mi.offsetWidth; mi.style.animation = ''; mi.src = `assets/img/${c.img}.webp`; mi.alt = c.tab + ' poster from The Skin BLVD';
    $('#menuCap').textContent = c.cap;
    $('#items').innerHTML = c.items.map(([n, d, tags], i) => `<article class="item" style="animation-delay:${i * 60}ms"><h3>${esc(n)}</h3><p>${esc(d)}</p><div class="foot-row"><div class="tags">${tags.map(t => `<span>${esc(t)}</span>`).join('')}</div><button data-book="${esc(n)}" aria-label="Book ${esc(n)}">Book</button></div></article>`).join('');
  };
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) { catI = +b.dataset.t; renderCat(); } });
  renderCat();

  const mq = ['Liftera A2', 'Jawtox', 'Nefertiti Lift', 'Lip Fillers', 'Rejuran I', 'Luhilo', 'PicoSure', 'GentleMax Pro', 'CO2 Laser', 'SkinPen', 'HydraFacial', 'Lemon Bottle'];
  $('#marquee').innerHTML = [...mq, ...mq].map(t => `<span>${esc(t)}</span>`).join('');

  /* ===== This or That (from their comparison posts) ===== */
  const VS = [
    ['Jawtox vs Nefertiti Lift', 'Both define your jawline, but in different ways.',
      ['Slim your jawline', 'Jawtox', 'Targets enlarged masseter muscles.', ['Softens a square-shaped jaw', 'Creates a slimmer lower-face appearance', 'Reduces muscle bulk from jaw clenching']],
      ['Define & refine', 'Nefertiti Lift', 'Targets the platysma muscles.', ['Improves jawline definition', 'Softens visible neck bands', 'Reduces downward muscle pull for a lift']]],
    ['Lip Flip vs Lip Filler', 'Both offer different ways to achieve your desired pout.',
      ['Subtle lift', 'Lip Flip', 'Muscle relaxation for a natural flip.', ['Subtle lift', 'Natural flip', 'Soft curl']],
      ['Added volume', 'Lip Filler', 'Lip enhancement for fuller lips.', ['Added volume', 'Fuller lips', 'Defined shape']]],
    ['Luhilo vs Luhilo Snow', 'Same hydration, different skin goals.',
      ['Hydrate + plump + bounce', 'Luhilo Classic', 'Hyaluronic acid, peptides and amino acids.', ['Deep hydration and elasticity', 'Supports collagen and skin barrier', 'Best for dry, dull, dehydrated skin']],
      ['Hydrate + brighten + glow', 'Luhilo Snow', 'Plus glutathione, niacinamide and arbutin.', ['Helps even out skin tone', 'Promotes a healthy, luminous glow', 'Best for dull, uneven skin']]],
    ['Liftera vs Exilis', 'Two technologies, different approaches to skin tightening.',
      ['Focused ultrasound', 'Liftera', 'For lifting and tightening.', ['Targets deeper tissue layers', 'Supports a firmer-looking facial contour', 'For sagging cheeks and jawline definition']],
      ['Radiofrequency + ultrasound', 'Exilis', 'For skin tightening.', ['Improves the look of laxity and firmness', 'For selected facial and body-contouring concerns', 'For smoother, firmer-looking skin']]]
  ];
  let vsI = 0;
  $('#vsTabs').innerHTML = VS.map((v, i) => `<button role="tab" aria-selected="${i === 0}" data-v="${i}">${esc(v[0])}</button>`).join('');
  const card = ([k, h, p, li]) => `<div class="vbox"><div class="top"><small>${esc(k)}</small><h3>${esc(h)}</h3><p>${esc(p)}</p></div><ul>${li.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  const renderVs = () => { const v = VS[vsI]; $$('#vsTabs button').forEach((b, i) => b.setAttribute('aria-selected', String(i === vsI))); $('#vs').innerHTML = card(v[2]) + `<span class="vs-badge" aria-hidden="true">vs</span>` + card(v[3]); $('#vsNote').innerHTML = `${esc(v[1])} <button data-book>Let our doctors decide →</button>`; };
  $('#vsTabs').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { vsI = +b.dataset.v; renderVs(); } });
  renderVs();

  /* ===== Microneedling myths (from their Myths vs Facts carousel) ===== */
  const MYTHS = [
    ['Microneedling makes your skin thinner.', 'It stimulates collagen and elastin production, helping improve skin firmness and texture.'],
    ['One session is all you need.', 'Multiple sessions may be recommended for optimal results, depending on your skin concerns.'],
    ['Microneedling only treats acne scars.', 'It can also improve fine lines, enlarged pores, uneven texture and stretch marks.'],
    ['Microneedling is extremely painful.', 'Numbing cream helps minimize discomfort, making treatment more tolerable.'],
    ['You can apply makeup immediately.', 'Avoid makeup for at least 24 hours or until your provider advises it’s safe.'],
    ['Recovery takes weeks.', 'Mild redness typically fades within 24–72 hours, though recovery varies.']
  ];
  $('#myths').innerHTML = MYTHS.map(([m, f]) => `<div class="myth reveal" data-open="true"><span class="pill">MYTH</span><div class="mbox">${esc(m)}</div><div class="fact"><span class="pill">FACT</span><div class="mbox">${esc(f)}</div></div></div>`).join('');
  $('#myths').addEventListener('click', e => { const b = e.target.closest('button.mbox'); if (!b) return; const m = b.closest('.myth'), o = m.dataset.open !== 'true'; m.dataset.open = String(o); b.setAttribute('aria-expanded', String(o)); });

  /* ===== Finder ===== */
  const CON = [
    ['Square jaw / clenching', 'Slim and soften the lower face.', ['Jawtox', 'Liftera A2']],
    ['Sagging, undefined jawline', 'Lift, tighten and define.', ['Liftera A2', 'Nefertiti Lift', 'HIFU']],
    ['Thin or uneven lips', 'From a subtle flip to added volume.', ['Lip Flip', 'Lip Fillers', 'Skinfill Bacio Lip Booster']],
    ['Dull, dehydrated skin', 'Hydration and glow from within.', ['Luhilo Classic', 'NCTF Skin Booster', 'HydraFacial']],
    ['Dark spots & uneven tone', 'Brighter, more even-looking skin.', ['PicoSure', 'Luhilo Snow']],
    ['Acne scars & texture', 'Renewal that works beneath the surface.', ['CO2 Laser', 'SkinPen Microneedling', 'BioRePeel']],
    ['Tired under-eyes', 'Smoother, refreshed under-eyes.', ['Rejuran I']],
    ['Unwanted hair', 'Less shaving, more smooth skin days.', ['GentleMax Pro']],
    ['Stubborn fat', 'Non-surgical contouring for stubborn areas.', ['Lemon Bottle', 'Mesolipo', 'Exilis for body']],
    ['Unwanted tattoo', 'Work towards fading it, session by session.', ['PicoSure']],
    ['Not sure yet', 'Start with a doctor’s assessment.', ['Consultation']]
  ];
  ALL.push({ n: 'Consultation', d: 'Let our doctors assess your skin and facial anatomy', cat: 'Start here' });
  const out = $('#finderOut');
  const empty = () => { out.innerHTML = `<div class="empty"><div><span>Your matches</span>Choose a concern<br>to begin.</div></div>`; };
  $('#concerns').innerHTML = CON.map((c, i) => `<button class="concern" aria-pressed="false" data-c="${i}">${esc(c[0])}</button>`).join('');
  $('#concerns').addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const was = b.getAttribute('aria-pressed') === 'true';
    $$('.concern').forEach(x => x.setAttribute('aria-pressed', 'false'));
    if (was) return empty();
    b.setAttribute('aria-pressed', 'true');
    const [t, why, refs] = CON[+b.dataset.c];
    out.innerHTML = `<h3>${esc(t)}</h3><p class="why">${esc(why)}</p>` + refs.map(n => ALL.find(x => x.n === n)).map((it, i) =>
      `<div class="pick" style="animation-delay:${i * 70}ms"><div><b>${esc(it.n)}</b><small>${esc(it.d)}</small></div><button data-book="${esc(it.n)}">Book</button></div>`).join('') +
      `<p class="note-s">Suggestions only. Your Skin BLVD doctor confirms the right treatment during your consultation.</p>`;
  });
  empty();

  /* ===== Inside ===== */
  const IN = [['in1', 'Front desk', 'a'], ['in4', 'Coffee & snack bar', 'b'], ['in2', 'Lounge', ''], ['in3', 'Doctors’ room', ''], ['in5', 'Hallway to 7 treatment rooms', 'w'], ['in6', 'Storefront', 'w']];
  $('#mosaic').innerHTML = IN.map(([f, c, k]) => `<figure class="reveal ${k}"><img src="assets/img/${f}.webp" alt="The Skin BLVD Makati: ${esc(c)}" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('');

  /* ===== Stories ===== */
  const ST = [['st1', 'Lip filler', 'Perfectly plumped'], ['st2', 'Jawtox', 'Sculpted naturally'], ['st3', 'Rejuran I', 'Under-eyes, refreshed']];
  $('#storiesGrid').innerHTML = ST.map(([f, k, t]) => `<figure class="polaroid reveal"><img src="assets/img/${f}.webp" alt="${esc(k)} before and after, as posted on The Skin BLVD's Facebook page" loading="lazy"><figcaption><small>${esc(k)}</small>${esc(t)}</figcaption></figure>`).join('');

  /* ===== FAQ ===== */
  const FAQ = [
    ['Do you accept walk-ins?', 'Yes. Both branches accept appointments and walk-ins. Booking ahead helps you get your preferred doctor and time.'],
    ['What are your hours?', 'Makati and QC are both open daily, 11AM to 7PM. Holiday schedules are posted on our Facebook page.'],
    ['Will you do any treatment I ask for?', 'Sometimes it’s a yes! Other times, our doctors will suggest an alternative that better suits your needs and goals. We recommend what you truly need, because your trust, safety and best results come first.'],
    ['How much are your treatments?', 'Rates depend on your treatment plan and are shared after consultation or by message. Call Makati at 0927 770 4026 or QC at 0968 320 3762, or message us on Facebook or Instagram.'],
    ['Should I start Botox in my 20s?', 'It depends on your face and goals. Botox can do more than smooth wrinkles: it can also help with clenching, jawline shape and muscle tension. Book a consultation and let our doctors assess.'],
    ['Is microneedling painful?', 'Numbing cream helps minimize discomfort. Mild redness typically fades within 24–72 hours, and you should avoid makeup for at least 24 hours.']
  ];
  $('#faqList').innerHTML = FAQ.map(([q, a], i) => `<details class="reveal"${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');

  /* ===== Open now (daily 11AM–7PM Manila) ===== */
  const setOpen = () => {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', hour12: false }).formatToParts(new Date());
    const hr = +p.find(x => x.type === 'hour').value % 24, el = $('#openNow'), open = hr >= 11 && hr < 19;
    el.classList.toggle('on', open);
    el.textContent = open ? 'Open now · until 7PM' : hr < 11 ? 'Opens today at 11AM' : 'Closed now · opens 11AM';
  };
  setOpen(); setInterval(setOpen, 60000);

  /* ===== Nav ===== */
  const nav = $('#nav'), bar = $('.progress span'), burger = $('#burger'), links = $('#links');
  const onScroll = () => { nav.classList.toggle('solid', scrollY > 30); const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const closeNav = () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => { const o = !links.classList.contains('open'); links.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o)); document.body.style.overflow = o ? 'hidden' : ''; });
  $$('a, button', links).forEach(a => a.addEventListener('click', closeNav));

  /* ===== Reveal ===== */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('in'));

  /* ===== Booking ===== */
  const modal = $('#book'), svc = $('#bkSvc');
  let branch = 'Makati';
  const setBranch = b => { branch = b; $$('#branchSeg button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.br === b))); };
  $('#branchSeg').addEventListener('click', e => { const b = e.target.closest('[data-br]'); if (b) setBranch(b.dataset.br); });
  svc.innerHTML = '<option value="">Choose a treatment…</option><option>Consultation (not sure yet)</option>' + CATS.map(c => `<optgroup label="${esc(c.tab)}">` + c.items.map(([n]) => `<option>${esc(n)}</option>`).join('') + '</optgroup>').join('');
  let cur = 0, date = null, time = null, viewM = new Date(); viewM.setDate(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxD = new Date(today); maxD.setDate(maxD.getDate() + 60);
  const SLOTS = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
  const fmtD = d => d.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const renderCal = () => {
    const y = viewM.getFullYear(), m = viewM.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    const prevOk = new Date(y, m, 1) > today, nextOk = new Date(y, m + 1, 1) <= maxD;
    let h = `<div class="cal-h"><button data-m="-1" ${prevOk ? '' : 'disabled'} aria-label="Previous month">‹</button>${viewM.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}<button data-m="1" ${nextOk ? '' : 'disabled'} aria-label="Next month">›</button></div><div class="cal-g">`;
    h += ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span>${d}</span>`).join('') + '<i></i>'.repeat(first);
    for (let d = 1; d <= days; d++) { const dt = new Date(y, m, d), off = dt < today || dt > maxD; h += `<button data-d="${d}" ${off ? 'disabled' : ''} class="${date && +dt === +date ? 'sel' : ''}" aria-label="${fmtD(dt)}">${d}</button>`; }
    $('#cal').innerHTML = h + '</div>';
  };
  $('#cal').addEventListener('click', e => {
    const m = e.target.closest('[data-m]'); if (m && !m.disabled) { viewM.setMonth(viewM.getMonth() + +m.dataset.m); renderCal(); return; }
    const d = e.target.closest('[data-d]'); if (d && !d.disabled) { date = new Date(viewM.getFullYear(), viewM.getMonth(), +d.dataset.d); renderCal(); clearErr(); }
  });
  $('#slots').innerHTML = SLOTS.map(s => `<button data-s="${s}">${s}</button>`).join('');
  $('#slots').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; time = b.dataset.s; $$('#slots button').forEach(x => x.classList.toggle('sel', x === b)); clearErr(); });
  const clearErr = () => $$('.err', modal).forEach(x => x.remove());
  const err = (el, t) => { clearErr(); const p = document.createElement('p'); p.className = 'err'; p.textContent = t; el.after(p); };
  const msgText = () => {
    const l = ['Hi The Skin BLVD! I’d like to book a consultation.', '', 'Branch: ' + BR[branch].name, 'Treatment: ' + svc.value];
    if (date) l.push('Preferred date: ' + fmtD(date)); if (time) l.push('Preferred time: ' + time);
    l.push('Name: ' + $('#bkName').value.trim(), 'Mobile: ' + $('#bkPhone').value.trim());
    const n = $('#bkNote').value.trim(); if (n) l.push('My skin goals: ' + n);
    l.push('', 'Thank you!'); return l.join('\n');
  };
  const show = i => {
    cur = i; $$('.step', modal).forEach(s => s.hidden = +s.dataset.step !== i); $$('#dots li').forEach((l, k) => l.classList.toggle('on', k <= i));
    $('#bkBack').style.visibility = i ? 'visible' : 'hidden'; $('#bkNext').style.display = i === 3 ? 'none' : ''; $('#bkNext').textContent = i === 2 ? 'Review' : 'Next';
    if (i === 1) renderCal();
    if (i === 3) { const t = msgText(), b = BR[branch]; $('#bkMsg').textContent = t; $('#sendSms').href = 'sms:' + b.phone + '?&body=' + encodeURIComponent(t); $('#sendSms').textContent = 'Text ' + b.disp; $('#callBr').href = 'tel:' + b.phone; $('#callBr').textContent = 'Call ' + b.name; $('#copied').textContent = ''; }
  };
  $('#bkNext').addEventListener('click', () => {
    if (cur === 0 && !svc.value) return err(svc.parentElement, 'Please choose a treatment (or “Consultation”).');
    if (cur === 1 && (!date || !time)) return err($('#slots'), 'Please pick a date and a time.');
    if (cur === 2) { if ($('#bkName').value.trim().length < 2) return err($('#bkName').parentElement, 'Please enter your name.'); if (!/^[0-9+()\s-]{7,20}$/.test($('#bkPhone').value.trim())) return err($('#bkPhone').parentElement, 'Please enter a valid mobile number.'); }
    clearErr(); show(cur + 1);
  });
  $('#bkBack').addEventListener('click', () => { clearErr(); show(Math.max(0, cur - 1)); });
  $('#sendMsgr').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(msgText()); $('#copied').textContent = 'Copied! Paste it in the Messenger chat that just opened.'; } catch { $('#copied').textContent = 'Opening Messenger. Copy the message above and paste it there.'; }
    window.open(MSGR, '_blank', 'noopener');
  });
  $('#sendIcs').addEventListener('click', () => {
    if (!date || !time) return;
    const [hm, ap] = time.split(' '); let [hh] = hm.split(':').map(Number); if (ap === 'PM' && hh !== 12) hh += 12;
    const p = n => String(n).padStart(2, '0'), d = `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}`, b = BR[branch];
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//The Skin BLVD//Booking//EN', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@theskinblvd', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
      `DTSTART;TZID=Asia/Manila:${d}T${p(hh)}0000`, `DTEND;TZID=Asia/Manila:${d}T${p(hh + 1)}0000`, 'SUMMARY:The Skin BLVD ' + b.name + ' – ' + svc.value.replace(/[,;]/g, ' '),
      'LOCATION:' + b.addr.replace(/,/g, '\\,'), 'DESCRIPTION:Requested schedule – wait for The Skin BLVD to confirm. ' + b.disp, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'skin-blvd-visit.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  let lastFocus = null;
  const openBook = (pre, br) => {
    lastFocus = document.activeElement; closeChat(); if (br) setBranch(br);
    if (pre) { const o = [...svc.options].find(o => o.value === pre) || [...svc.options].find(o => o.value && o.value.toLowerCase().includes(pre.toLowerCase().split(' ')[0])); if (o) svc.value = o.value; }
    modal.hidden = false; document.body.style.overflow = 'hidden'; show(0); svc.focus();
  };
  const closeBook = () => { modal.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.(); };
  document.addEventListener('click', e => { const b = e.target.closest('[data-book]'); if (b) { e.preventDefault(); openBook(b.dataset.book, b.dataset.branch); } });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) closeBook(); });

  /* ===== Ask Skin BLVD (keyword assistant) ===== */
  const chat = $('#chat'), log = $('#chatLog');
  const say = (h, who = 'bot') => { const d = document.createElement('div'); d.className = 'bub ' + who; if (who === 'me') d.textContent = h; else d.innerHTML = h; log.appendChild(d); log.scrollTop = log.scrollHeight; };
  const BOOK = ` <a href="#" data-book>Book a consultation</a> or message us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`;
  const KB = [
    [/hour|open|close|sunday|time|bukas|sarado|oras|walk/, () => `Both branches are open <b>daily, 11AM to 7PM</b>. We accept appointments and walk-ins.`],
    [/where|address|location|saan|map|direction|branch|makati|qc|quezon|timog|arnaiz/, () => `<b>Makati:</b> 2F Colbella Arcade, 910 Antonio Arnaiz Ave., San Lorenzo.<br><b>QC:</b> GF Symphony Towers I, Sgt. Esguerra cor. Timog Ave., South Triangle. <a href="#visit">See maps</a>.`],
    [/price|how much|magkano|cost|rate|promo|package|discount/, () => `Rates depend on your treatment plan and are shared after consultation or by message. Call Makati <a href="tel:+639277704026">0927 770 4026</a> or QC <a href="tel:+639683203762">0968 320 3762</a>, or DM us on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`],
    [/contact|phone|number|call|\btext\b|instagram|\big\b|messenger/, () => `Makati: <a href="tel:+639277704026">0927 770 4026</a> · QC: <a href="tel:+639683203762">0968 320 3762</a> · Instagram <b>@theskinblvdph</b> · <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>.`],
    [/book|appoint|reserve|sched|pa-book/, () => `Easy: choose your branch and treatment, pick a time, and we confirm by message.` + BOOK],
    [/doctor|doc |derm|nina|shine|erin|cel|vada|founder/, () => `Our founders are the Derm Besties, <b>Doc Nina and Doc Shine</b>. The team also includes <b>Doc Erin, Doc Cel and Doc Vada</b>.`],
    [/liftera|hifu|lift|sag|tight/, () => `<b>Liftera A2</b> is our new-generation HIFU, designed for a more comfortable, precise treatment. It has a line handpiece for broader areas and a pen handpiece for facial curves.` + BOOK],
    [/jaw|nefertiti|masseter|clench|square/, () => `<b>Jawtox</b> targets the masseter muscles to slim a square jaw. <b>Nefertiti Lift</b> targets the platysma for jawline definition and softer neck bands. Our doctors assess which one your face needs.` + BOOK],
    [/botox|traptox|alartox|wrinkle/, () => `Botox can do more than smooth wrinkles: we also offer <b>Jawtox, Nefertiti Lift, Traptox</b> (muscle tension) and <b>Lip Flip</b>.`],
    [/lip|pout|filler|bacio/, () => `For lips: <b>Lip Flip</b> (subtle lift), <b>Lip Fillers</b> (added volume, defined shape) and <b>Skinfill Bacio Lip Booster</b> (hydration, juicy-looking lips).`],
    [/rejuran|eye|luhilo|nctf|booster|glow|dull|hydrat/, () => `Skin boosters: <b>Rejuran I</b> for under-eyes, <b>Luhilo Classic</b> for hydration, <b>Luhilo Snow</b> for brightening, and <b>NCTF</b> for overall skin quality.`],
    [/laser|pico|pigment|spot|melasma|tattoo|hair|gentlemax|co2|scar/, () => `Our lasers: <b>PicoSure</b> (pigmentation, acne marks, tattoo fading), <b>GentleMax Pro</b> (long-term hair reduction) and <b>CO2 Laser</b> (acne scars and texture).`],
    [/microneedl|skinpen|pore|texture|hydrafacial|biorepeel|peel/, () => `For texture and pores: <b>SkinPen microneedling</b>, <b>BioRePeel</b> and <b>HydraFacial</b>. Numbing cream keeps microneedling comfortable.`],
    [/fat|lemon|mesolipo|exilis|body|chin|tummy|arm|slim/, () => `For stubborn fat: <b>Lemon Bottle</b>, <b>Mesolipo</b> and <b>Exilis</b>. Our doctors help you choose safe, personalized contouring.`],
    [/hi|hello|good|kumusta|hey/, () => `Hi! ✨ Ask me about treatments, our doctors, branches or booking.`]
  ];
  const QUICK = ['Hours', 'Branches', 'Prices', 'Liftera', 'Jawtox', 'Doctors', 'Book'];
  $('#chatQuick').innerHTML = QUICK.map(t => `<button data-q="${t}">${t}</button>`).join('');
  const answer = t => { say(t, 'me'); const hit = KB.find(([re]) => re.test(t.toLowerCase())); setTimeout(() => say(hit ? hit[1]() : `I'm not sure about that one. Our team can answer on <a href="${MSGR}" target="_blank" rel="noopener">Messenger</a>, or call Makati <a href="tel:+639277704026">0927 770 4026</a> / QC <a href="tel:+639683203762">0968 320 3762</a>.`), 350); };
  let greeted = false;
  const openChat = () => { chat.hidden = false; if (!greeted) { greeted = true; say('Hi, welcome to The Skin BLVD! ✨ I can help with treatments, branches and booking.'); } $('#chatIn').focus(); };
  function closeChat() { chat.hidden = true; }
  document.addEventListener('click', e => { if (e.target.closest('[data-chat]')) { e.preventDefault(); openChat(); } });
  chat.addEventListener('click', e => { if (e.target.closest('.x')) closeChat(); const b = e.target.closest('[data-q]'); if (b) answer(b.dataset.q); });
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; $('#chatIn').value = ''; answer(v); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { if (!modal.hidden) closeBook(); else if (!chat.hidden) closeChat(); else closeNav(); } });
})();
