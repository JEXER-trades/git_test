import { readFileSync } from 'node:fs';
import { site, hours, offer, testimonials } from './data/site.mjs';

const images = JSON.parse(readFileSync(new URL('./data/images.json', import.meta.url)));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Routes / navigation ----------
export const R = {
  home: '/',
  about: '/ueber-uns/',
  training: '/training/',
  kraft: '/training/fitness-krafttraining/',
  egym: '/training/geraetetraining-egym/',
  milon: '/training/milon-zirkeltraining/',
  cardio: '/training/cardio-ausdauer/',
  skillcourt: '/training/skillcourt/',
  bodybuilding: '/training/leistungssport-bodybuilding/',
  pt: '/training/personal-training/',
  ruecken: '/gesundheit/ruecken/',
  figur: '/gesundheit/figur-ernaehrung/',
  kurse: '/kurse/',
  wellness: '/wellness/',
  neubau: '/albgym-3-0/',
  mitglied: '/mitgliedschaft/',
  probe: '/probetraining/',
  kontakt: '/kontakt/',
  impressum: '/impressum/',
  datenschutz: '/datenschutz/',
};

export const nav = [
  { label: 'Studio', href: R.neubau, children: [
    { label: 'ALBGYM 3.0 · Neubau 2027', href: R.neubau, text: 'Die neue Fitness- & Gesundheitswelt auf über 1.100 m²' },
    { label: 'Mitgliedschaften & Angebote', href: R.mitglied, text: '4 Wochen ALBGYM erleben' },
    { label: 'Probetraining', href: R.probe, text: 'Dein persönlicher Einstieg' },
  ] },
  { label: 'Training', href: R.training, children: [
    { label: 'Fitness & Krafttraining', href: R.kraft },
    { label: 'Gerätetraining & EGYM', href: R.egym },
    { label: 'Milon-Zirkeltraining', href: R.milon },
    { label: 'Cardio & Ausdauer', href: R.cardio },
    { label: 'Skillcourt', href: R.skillcourt },
    { label: 'Leistungssport & Bodybuilding', href: R.bodybuilding },
    { label: 'Personal Training', href: R.pt },
  ] },
  { label: 'Gesundheit', href: R.ruecken, children: [
    { label: 'Gesundheit & Rücken', href: R.ruecken, text: 'Rückenschule, five®, Rehasport' },
    { label: 'Figur & Ernährung', href: R.figur, text: 'myline, metabolic balance®, Beratung' },
  ] },
  { label: 'Kurse', href: R.kurse },
  { label: 'Wellness', href: R.wellness },
  { label: 'Über uns', href: R.about },
  { label: 'Kontakt', href: R.kontakt },
];

// ---------- Images ----------
export function pic(key, { alt, sizes = '100vw', cls = '', eager = false, priority = false, ratio } = {}) {
  const m = images[key];
  if (!m) throw new Error(`Unknown image: ${key}`);
  const set = (fmt) => m.widths.map((w) => `/img/${key}-${w}.${fmt} ${w}w`).join(', ');
  const fallbackW = m.widths.find((w) => w >= 1200) || m.widths[m.widths.length - 1];
  const style = `--tone:${m.tone}${ratio ? `;aspect-ratio:${ratio}` : ''}`;
  return `<picture class="pic ${cls}" style="${style}"><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="/img/${key}-${fallbackW}.jpg" srcset="${set('jpg')}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async"${priority ? ' fetchpriority="high"' : ''}></picture>`;
}
export const imgUrl = (key, w = 1200) => {
  const m = images[key];
  const width = m.widths.find((x) => x >= w) || m.widths[m.widths.length - 1];
  return `/img/${key}-${width}.jpg`;
};

// ---------- Small components ----------
export const icon = {
  arrow: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  phone: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3.5l1.5 4-2 1.3a11 11 0 0 0 6.7 6.7L16 14l4 1.5V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  mail: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6h17v12h-17zM3.5 6.5l8.5 7 8.5-7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  pin: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  insta: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>',
  fb: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V7c0-.8.5-1 1-1h2V3h-2.8C11.5 3 11 5 11 6.6v1.9H9V12h2v9h3v-9h2.5l.5-3.5Z" fill="currentColor"/></svg>',
  check: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  clock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  wa: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.2-3.8A8.5 8.5 0 1 1 8 19z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
};

export const btn = (label, href, { variant = 'primary', cls = '', attrs = '' } = {}) =>
  `<a class="btn btn--${variant} ${cls}" href="${href}" ${attrs}><span>${label}</span>${icon.arrow}</a>`;

export const eyebrow = (t) => `<p class="eyebrow">${t}</p>`;

export const hoursTable = (cls = '') =>
  `<dl class="hours ${cls}" data-hours>${hours
    .map((h) => `<div class="hours__row" data-dow="${h.dow.join(',')}"><dt><abbr title="${h.label}">${h.days}</abbr></dt><dd>${h.slots.map((s) => `${s[0]}–${s[1]}`).join('<br>')}</dd></div>`)
    .join('')}</dl>`;

export const contactLinks = (cls = '') => `<ul class="contact-links ${cls}">
  <li><a href="tel:${site.phoneIntl}">${icon.phone}<span>${site.phone}</span></a></li>
  <li><a href="mailto:${site.email}">${icon.mail}<span>${site.email}</span></a></li>
  <li><a href="${site.mapsDirections}" target="_blank" rel="noopener">${icon.pin}<span>${site.street}, ${site.zip} ${site.city}</span></a></li>
</ul>`;

// Page hero for inner pages
export function pageHero({ kicker, title, lead, image, alt, ctas = [], tone = 'dark', crumbs = [] }) {
  return `<section class="phero phero--${tone}">
  <div class="phero__media" data-parallax>${pic(image, { alt, eager: true, priority: true, sizes: '100vw' })}</div>
  <div class="phero__inner wrap">
    ${breadcrumbs(crumbs)}
    ${eyebrow(kicker)}
    <h1 class="display reveal-lines">${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${ctas.length ? `<div class="cta-row">${ctas.join('')}</div>` : ''}
  </div>
</section>`;
}

export function breadcrumbs(items) {
  if (!items.length) return '';
  const all = [{ label: 'Startseite', href: '/' }, ...items];
  return `<nav class="crumbs" aria-label="Brotkrumen"><ol>${all
    .map((c, i) => (i === all.length - 1 ? `<li aria-current="page">${c.label}</li>` : `<li><a href="${c.href}">${c.label}</a></li>`))
    .join('')}</ol></nav>`;
}

export function crumbsLd(items, path) {
  const all = [{ label: 'Startseite', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.url + (i === all.length - 1 ? path : c.href) })),
  };
}

// Feature list (numbered)
export const featureList = (items, cls = '') =>
  `<ol class="flist ${cls}">${items
    .map((it, i) => `<li class="flist__item reveal"><span class="flist__n">${String(i + 1).padStart(2, '0')}</span><div><h3>${it.t}</h3><p>${it.d}</p></div></li>`)
    .join('')}</ol>`;

// Split editorial block
export const split = ({ img, alt, kicker, title, body, reverse = false, ratio = '4/5', extra = '', id = '' }) =>
  `<section class="split ${reverse ? 'split--rev' : ''}"${id ? ` id="${id}"` : ''}><div class="wrap split__grid">
  <div class="split__media reveal-img">${pic(img, { alt, ratio, sizes: '(min-width: 900px) 45vw, 100vw' })}</div>
  <div class="split__text">${kicker ? eyebrow(kicker) : ''}<h2 class="h2">${title}</h2>${body}${extra}</div>
</div></section>`;

// Offer block (re-used on many pages)
export const offerBlock = ({ compact = false } = {}) => `<section class="offer ${compact ? 'offer--compact' : ''}" id="angebot" aria-labelledby="offer-title">
  <div class="wrap offer__grid">
    <div class="offer__media reveal-img">${pic('kurs-energie', { alt: 'Gruppentraining mit Hanteln in entspannter Atmosphäre', sizes: '(min-width: 900px) 50vw, 100vw', ratio: '4/3' })}</div>
    <div class="offer__card">
      ${eyebrow('Online-Angebot · Für Neukunden')}
      <h2 class="h2" id="offer-title">4 Wochen<br>ALBGYM erleben</h2>
      <p class="offer__price"><span class="offer__amount">${offer.price}</span><span class="offer__unit">${offer.unit}</span></p>
      <p class="offer__product">${offer.product}</p>
      <ul class="ticks">${offer.benefits.map((b) => `<li>${icon.check}<span>${b}</span></li>`).join('')}</ul>
      <div class="cta-row">${btn('Jetzt Angebot sichern', R.mitglied + '?angebot=schnupper#anfrage')}${btn('Online abschließen', site.membershipShop, { variant: 'ghost', attrs: 'rel="noopener"' })}</div>
      <p class="fine">${offer.note}</p>
    </div>
  </div>
</section>`;

// Final conversion band
export const finalCta = ({ title = 'Dein nächstes Level beginnt hier.', text = 'Ob dein erstes Training, neue persönliche Ziele oder ein gesünderer Lebensstil – wir begleiten dich auf deinem Weg.', image = 'highfive-hanteln', alt = 'Zwei Trainierende klatschen sich nach dem Training ab' } = {}) => `<section class="final" aria-labelledby="final-title">
  <div class="final__media" data-parallax>${pic(image, { alt, sizes: '100vw' })}</div>
  <div class="wrap final__inner">
    ${eyebrow('Dein Start im ALBGYM')}
    <h2 class="display display--xl reveal-lines" id="final-title">${title}</h2>
    <p class="lead">${text}</p>
    <div class="cta-row">${btn('Jetzt Probetraining vereinbaren', R.probe)}<a class="btn btn--ghost-light" href="tel:${site.phoneIntl}">${icon.phone}<span>${site.phone}</span></a></div>
  </div>
</section>`;

// Testimonials carousel
export const testimonialsBlock = ({ title = 'In guter Gesellschaft.', filter } = {}) => {
  const list = filter ? testimonials.filter((t) => filter.includes(t.name)) : testimonials;
  return `<section class="voices" aria-labelledby="voices-title">
  <div class="wrap voices__head">
    <div>${eyebrow('Mitglieder · 14 bis 88 Jahre')}<h2 class="h2" id="voices-title">${title}</h2></div>
    <div class="voices__nav"><button class="roundbtn" type="button" data-scroll="-1" aria-label="Vorherige Stimme"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><button class="roundbtn" type="button" data-scroll="1" aria-label="Nächste Stimme">${icon.arrow}</button></div>
  </div>
  <ul class="voices__track" data-track tabindex="0" aria-label="Erfahrungen unserer Mitglieder">
    ${list
      .map(
        (t) => `<li class="voice"><figure>
      <div class="voice__img">${pic(t.img, { alt: t.alt, sizes: '(min-width: 900px) 22rem, 80vw', ratio: '1/1' })}</div>
      <blockquote><p>„${t.quote}“</p></blockquote>
      <figcaption><strong>${t.name}</strong><span>${[t.age, t.since].filter(Boolean).join(' · ')}</span></figcaption>
    </figure></li>`
      )
      .join('')}
  </ul>
  <p class="wrap fine voices__fine">Persönliche Erfahrungen unserer Mitglieder. Individuelle Ergebnisse können abweichen; Training ersetzt keine ärztliche Behandlung.</p>
</section>`;
};

// Cross links to other pages
export const related = (items, title = 'Das passt dazu') => `<section class="related"><div class="wrap">
  ${eyebrow('Weiterentdecken')}<h2 class="h3">${title}</h2>
  <ul class="related__list">${items
    .map((i) => `<li><a class="related__item" href="${i.href}">${pic(i.img, { alt: '', sizes: '(min-width: 900px) 30vw, 90vw', ratio: '3/2' })}<span class="related__label">${i.label}${icon.arrow}</span></a></li>`)
    .join('')}</ul>
</div></section>`;

// Status chip used for ALBGYM 3.0 (heute / bestätigt / geplant)
export const status = (k) =>
  ({
    now: '<span class="status status--now">Heute verfügbar</span>',
    confirmed: '<span class="status status--confirmed">Im Bau · Frühjahr 2027</span>',
    planned: '<span class="status status--planned">Geplant für ALBGYM 3.0</span>',
  })[k];
