import { site, hours } from './data/site.mjs';
import { R, nav, esc, icon, hoursTable, imgUrl } from './lib.mjs';

const logoMark = `<svg class="logo__mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.25" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 20h11" stroke="currentColor" stroke-width="1.5"/></svg>`;
export const logo = (cls = '') => `<a class="logo ${cls}" href="/" aria-label="ALBGYM – zur Startseite">${logoMark}<span class="logo__word">ALB<span>GYM</span></span></a>`;

function header(path) {
  const isActive = (item) => item.href === path || (item.children || []).some((c) => c.href === path) || (item.href !== '/' && path.startsWith(item.href));
  const desktop = nav
    .map((item, i) => {
      const active = isActive(item) ? ' aria-current="page"' : '';
      if (!item.children) return `<li><a class="nav__link" href="${item.href}"${active}>${item.label}</a></li>`;
      return `<li class="nav__has"><a class="nav__link" href="${item.href}"${active} aria-haspopup="true">${item.label}</a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="sub-${i}" aria-label="${item.label}: Untermenü öffnen"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.3"/></svg></button>
      <div class="nav__sub" id="sub-${i}"><ul>${item.children
        .map((c) => `<li><a href="${c.href}"${c.href === path ? ' aria-current="page"' : ''}><span>${c.label}</span>${c.text ? `<small>${c.text}</small>` : ''}</a></li>`)
        .join('')}</ul></div></li>`;
    })
    .join('');
  const mobile = nav
    .map(
      (item) => `<li><a href="${item.href}">${item.label}</a>${item.children ? `<ul>${item.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul>` : ''}</li>`
    )
    .join('');
  return `<a class="skip" href="#main">Zum Inhalt springen</a>
<header class="hdr" data-header>
  <div class="hdr__bar wrap wrap--wide">
    ${logo()}
    <nav class="nav" aria-label="Hauptnavigation"><ul class="nav__list">${desktop}</ul></nav>
    <a class="btn btn--primary btn--sm hdr__cta" href="${R.probe}"><span>Jetzt Probetraining vereinbaren</span></a>
    <a class="hdr__call" href="tel:${site.phoneIntl}" aria-label="ALBGYM anrufen: ${site.phone}">${icon.phone}</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu" data-burger><span class="sr">Menü öffnen</span><i></i><i></i></button>
  </div>
</header>
<div class="menu" id="menu" data-menu hidden>
  <nav class="menu__inner wrap" aria-label="Mobile Navigation">
    <ul class="menu__list">${mobile}</ul>
    <div class="menu__foot">
      <a class="btn btn--primary btn--block" href="${R.probe}"><span>Jetzt Probetraining vereinbaren</span>${icon.arrow}</a>
      <div class="menu__contact"><a href="tel:${site.phoneIntl}">${icon.phone}${site.phone}</a><a href="mailto:${site.email}">${icon.mail}${site.email}</a></div>
    </div>
  </nav>
</div>`;
}

function footer() {
  const col = (title, links) => `<div class="ftr__col"><h2 class="ftr__h">${title}</h2><ul>${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;
  return `<footer class="ftr">
  <div class="wrap wrap--wide">
    <div class="ftr__top">
      <div class="ftr__brand">
        ${logo('logo--lg')}
        <p>Fitness- und Gesundheitszentrum für alle Generationen – mitten im Südschwarzwald.</p>
        <div class="ftr__social">
          <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="ALBGYM auf Instagram">${icon.insta}</a>
          <a href="${site.facebook}" target="_blank" rel="noopener" aria-label="ALBGYM auf Facebook">${icon.fb}</a>
        </div>
      </div>
      <div class="ftr__col"><h2 class="ftr__h">Kontakt</h2>
        <address><strong>${site.longName}</strong><br>${site.street}<br>${site.zip} ${site.city}</address>
        <ul><li><a href="tel:${site.phoneIntl}">Tel. ${site.phone}</a></li><li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${site.mapsDirections}" target="_blank" rel="noopener">Route planen</a></li></ul>
      </div>
      <div class="ftr__col"><h2 class="ftr__h">Öffnungszeiten</h2>${hoursTable('hours--ftr')}<p class="ftr__open" data-open-state></p></div>
      ${col('Training', [['Fitness & Krafttraining', R.kraft], ['Gerätetraining & EGYM', R.egym], ['Milon-Zirkel', R.milon], ['Cardio & Ausdauer', R.cardio], ['Skillcourt', R.skillcourt], ['Leistungssport', R.bodybuilding], ['Personal Training', R.pt]])}
      ${col('ALBGYM', [['Gesundheit & Rücken', R.ruecken], ['Figur & Ernährung', R.figur], ['Kursprogramm', R.kurse], ['Wellness', R.wellness], ['ALBGYM 3.0', R.neubau], ['Mitgliedschaften', R.mitglied], ['Über uns', R.about], ['Kontakt', R.kontakt]])}
    </div>
    <div class="ftr__bottom">
      <p>© ${new Date().getFullYear()} ALBGYM Fitness- und Gesundheitszentrum St. Blasien</p>
      <ul><li><a href="${R.impressum}">Impressum</a></li><li><a href="${R.datenschutz}">Datenschutz</a></li><li><button type="button" class="linkbtn" data-consent-open>Cookie-Einstellungen</button></li></ul>
    </div>
  </div>
</footer>
<div class="mbar" data-mbar><a class="mbar__call" href="tel:${site.phoneIntl}" aria-label="Anrufen">${icon.phone}<span>Anrufen</span></a><a class="btn btn--primary btn--sm" href="${R.probe}"><span>Probetraining vereinbaren</span>${icon.arrow}</a></div>
<div class="consent" data-consent hidden role="dialog" aria-modal="false" aria-labelledby="consent-title">
  <div class="consent__box">
    <h2 class="consent__title" id="consent-title">Deine Privatsphäre</h2>
    <p>Wir verwenden nur technisch notwendige Speicherungen. Externe Inhalte (Google Maps) und eine datensparsame Besucherstatistik laden wir nur mit deiner Einwilligung. Mehr in der <a href="${R.datenschutz}">Datenschutzerklärung</a>.</p>
    <form class="consent__opts" data-consent-form>
      <label class="switch"><input type="checkbox" checked disabled><span>Notwendig</span><small>Speichert deine Auswahl</small></label>
      <label class="switch"><input type="checkbox" name="media"><span>Externe Medien</span><small>Google Maps Karte</small></label>
      <label class="switch" data-analytics-option><input type="checkbox" name="stats"><span>Statistik</span><small>Matomo, IP-anonymisiert</small></label>
      <div class="consent__btns">
        <button class="btn btn--ghost btn--sm" type="submit" value="selected"><span>Auswahl speichern</span></button>
        <button class="btn btn--ghost btn--sm" type="button" data-consent-deny><span>Nur notwendige</span></button>
        <button class="btn btn--primary btn--sm" type="button" data-consent-all><span>Alle akzeptieren</span></button>
      </div>
    </form>
  </div>
</div>`;
}

const fontPreload = ['/fonts/fraunces-latin-wght-normal.woff2', '/fonts/inter-latin-wght-normal.woff2'];

const localBusiness = () => ({
  '@context': 'https://schema.org',
  '@type': ['HealthClub', 'SportsActivityLocation'],
  '@id': site.url + '/#albgym',
  name: site.longName,
  alternateName: 'ALBGYM',
  url: site.url + '/',
  telephone: site.phoneDisplayIntl,
  email: site.email,
  image: site.url + imgUrl('hero-kraft-generationen', 1600),
  logo: site.url + '/icons/icon-512.png',
  priceRange: '€€',
  address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressRegion: 'Baden-Württemberg', addressCountry: 'DE' },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: ['St. Blasien', 'Südschwarzwald', 'Höchenschwand', 'Häusern', 'Bernau im Schwarzwald', 'Schluchsee', 'Dachsberg', 'Ibach'],
  sameAs: [site.instagram, site.facebook],
  openingHoursSpecification: hours.flatMap((h) =>
    h.slots.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dow.map((d) => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][d - 1]),
      opens: s[0],
      closes: s[1],
    }))
  ),
});

export function layout({ path, title, description, body, image = 'hero-kraft-generationen', ld = [], noindex = false, bodyClass = '' }) {
  const canonical = site.url + path;
  const ogImage = site.url + imgUrl(image, 1200);
  const jsonld = [localBusiness(), ...ld].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0f0f0e">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="ALBGYM St. Blasien">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${fontPreload.map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<link rel="stylesheet" href="/css/main.css?v=__V__">
<script>document.documentElement.classList.add('js')</script>
<script src="/js/config.js?v=__V__" defer></script>
<script src="/js/main.js?v=__V__" defer></script>
${jsonld}
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>`;
}
