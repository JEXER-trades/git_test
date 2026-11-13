import { readFileSync } from 'node:fs';
import { site } from '../data/site.mjs';
import { R, btn, eyebrow, breadcrumbs, icon } from '../lib.mjs';
import { logo } from '../layout.mjs';

const ds = readFileSync(new URL('../data/datenschutz.html', import.meta.url), 'utf8');
const legalWrap = (crumbs, kicker, title, body) => `<section class="legal dark" style="padding-bottom:4rem"><div class="wrap">${breadcrumbs(crumbs)}${eyebrow(kicker)}<h1 class="display" style="font-size:clamp(2.4rem,6vw,4.5rem)">${title}</h1></div></section>
<section class="sec--tight"><div class="wrap"><div class="prose">${body}</div></div></section>`;

export const impressum = {
  path: R.impressum,
  title: 'Impressum · ALBGYM St. Blasien',
  description: 'Impressum des ALBGYM Fitness- und Gesundheitszentrum, Sascha Bernhardt, Todtmooser Str. 8, 79837 St. Blasien.',
  crumbs: [{ label: 'Impressum', href: R.impressum }],
  render() {
    // Text 1:1 from albgym.de/impressum (Stand 11/2026)
    return legalWrap(this.crumbs, 'Rechtliches', 'Impressum', `
<h2>Angaben gemäß § 5 DDG</h2>
<p>Fitness- und Gesundheitszentrum ALBGYM<br>Sascha Bernhardt<br>${site.street}<br>${site.zip} ${site.city}</p>
<p>Telefon: <a href="tel:${site.phoneIntl}">07672-1001</a><br>E-Mail: <a href="mailto:${site.email}">${site.email}</a></p>
<p>Vertretungsberechtigter Geschäftsführer: Sascha Bernhardt</p>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 295894925</p>
<p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Sascha Bernhardt</p>
<h2>Streitschlichtung</h2>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Haftung für Inhalte</h2>
<p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
<h2>Haftung für Links</h2>
<p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
<h2>Urheberrecht</h2>
<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
<h2>Bildnachweis</h2>
<p>Fotos: ALBGYM Fitness- und Gesundheitszentrum sowie Bildmaterial aus dem Bestand der bisherigen Website. Die Rechte liegen bei den jeweiligen Urhebern.</p>`);
  },
};

export const datenschutz = {
  path: R.datenschutz,
  title: 'Datenschutzerklärung · ALBGYM St. Blasien',
  description: 'Datenschutzerklärung des ALBGYM St. Blasien: Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.',
  crumbs: [{ label: 'Datenschutz', href: R.datenschutz }],
  render() {
    return legalWrap(this.crumbs, 'Rechtliches', 'Datenschutz&shy;erklärung', `${ds}
<h2>Ihre Einstellungen</h2>
<p>Sie können Ihre Einwilligungen jederzeit ändern oder widerrufen: <button type="button" class="linkbtn" data-consent-open>Cookie-Einstellungen öffnen</button>.</p>`);
  },
};

export const notFound = {
  path: '/404.html',
  canonicalPath: '/404/',
  noindex: true,
  title: 'Seite nicht gefunden · ALBGYM St. Blasien',
  description: 'Diese Seite wurde nicht gefunden.',
  render() {
    return `<section class="nf"><div class="wrap">
  <p class="nf__num" aria-hidden="true">404</p>
  ${eyebrow('Seite nicht gefunden')}
  <h1 class="h2">Hier geht’s nicht weiter.<br><em>Dein Training schon.</em></h1>
  <p class="lead" style="color:rgba(244,241,234,.8)">Die gesuchte Seite existiert nicht oder ist umgezogen – vielleicht im Zuge unseres neuen Webauftritts.</p>
  <div class="cta-row">${btn('Zur Startseite', '/')}${btn('Probetraining vereinbaren', R.probe, { variant: 'ghost-light' })}<a class="btn btn--ghost-light" href="tel:${site.phoneIntl}">${icon.phone}<span>${site.phone}</span></a></div>
  <ul style="display:flex;flex-wrap:wrap;gap:1rem 2rem;margin-top:3rem;color:var(--stone-2)">${[['Training', R.training], ['Kurse', R.kurse], ['Gesundheit', R.ruecken], ['ALBGYM 3.0', R.neubau], ['Kontakt', R.kontakt]].map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
</div></section>`;
  },
};

export const danke = {
  path: '/danke/',
  noindex: true,
  title: 'Vielen Dank · ALBGYM St. Blasien',
  description: 'Deine Anfrage ist bei uns eingegangen.',
  render() {
    return `<section class="nf"><div class="wrap">
  ${eyebrow('Anfrage erhalten')}
  <h1 class="display reveal-lines">Vielen Dank.<br><em>Wir melden uns.</em></h1>
  <p class="lead" style="color:rgba(244,241,234,.8);margin-top:2rem">Deine Anfrage ist bei uns eingegangen. Unser Team meldet sich in Kürze persönlich bei dir – in der Regel am nächsten Öffnungstag.</p>
  <div class="cta-row">${btn('Zur Startseite', '/')}${btn('Kursplan ansehen', R.kurse, { variant: 'ghost-light' })}</div>
</div></section>`;
  },
};

export const formError = {
  path: '/anfrage-fehler/',
  noindex: true,
  title: 'Anfrage nicht gesendet · ALBGYM St. Blasien',
  description: 'Deine Anfrage konnte nicht gesendet werden.',
  render() {
    return `<section class="nf"><div class="wrap">
  ${eyebrow('Anfrage nicht gesendet')}
  <h1 class="h2">Das hat leider<br><em>nicht geklappt.</em></h1>
  <p class="lead" style="color:rgba(244,241,234,.8)">Bitte prüfe, ob alle Pflichtfelder ausgefüllt sind und die Einwilligung bestätigt ist – oder melde dich direkt bei uns.</p>
  <div class="cta-row"><a class="btn btn--primary" href="javascript:history.back()"><span>Zurück zum Formular</span>${icon.arrow}</a><a class="btn btn--ghost-light" href="tel:${site.phoneIntl}">${icon.phone}<span>${site.phone}</span></a><a class="btn btn--ghost-light" href="mailto:${site.email}">${icon.mail}<span>${site.email}</span></a></div>
</div></section>`;
  },
};
