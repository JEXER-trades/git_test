import { site, schedule, courses, courseCategories } from '../data/site.mjs';
import { R, icon, esc } from '../lib.mjs';

export const timetable = ({ dark = false, enquire = false } = {}) => {
  const hasWeekend = schedule.slice(5).some((d) => d.items.length);
  const days = hasWeekend ? schedule : schedule.slice(0, 5);
  return `<div class="tt" data-tt>
  <div class="tt__filters" role="group" aria-label="Kurse nach Kategorie filtern">
    <button class="fbtn" type="button" data-cat="all" aria-pressed="true">Alle Kurse</button>
    ${Object.entries(courseCategories).map(([k, v]) => `<button class="fbtn" type="button" data-cat="${k}" aria-pressed="false">${v}</button>`).join('')}
  </div>
  <div class="tt__days" role="tablist" aria-label="Wochentag wählen">
    ${days.map((d, i) => `<button class="tt__day" type="button" role="tab" id="tab-${d.short}" aria-controls="col-${d.short}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${d.short}<small>${d.items.length} Kurse</small></button>`).join('')}
  </div>
  <div class="tt__grid${hasWeekend ? ' has-weekend' : ''}">
    ${days
      .map(
        (d, i) => `<section class="tt__col${i === 0 ? ' is-active' : ''}" id="col-${d.short}" role="tabpanel" aria-labelledby="tab-${d.short}"><h3>${d.day}</h3><ul>
      ${d.items.length
        ? d.items
            .map(([a, b, n]) => {
              const c = courses[n];
              const inner = `<time datetime="${a}">${a}–${b}</time><b>${n}</b>${c.note ? `<small>${c.note}</small>` : `<small>${courseCategories[c.cat]}</small>`}`;
              return `<li class="slot" data-cat="${c.cat}">${inner}</li>`;
            })
            .join('')
        : '<li class="slot slot--empty">Kein Kursangebot – freies Training während der Öffnungszeiten.</li>'}
    </ul></section>`
      )
      .join('')}
  </div>
  <p class="tt__legend">Kursplan laut aktuellem Stand · Änderungen vorbehalten · Samstag &amp; Sonntag freies Training. Rehasport nur mit ärztlicher Verordnung.</p>
</div>`;
};

export const mapBlock = () => `<div class="map" data-map="${esc(site.mapsEmbed)}">
  <div class="map__ph">
    ${icon.pin}
    <p><strong style="color:var(--bone);display:block;font-weight:500;margin-bottom:.4rem">${site.street} · ${site.zip} ${site.city}</strong>Beim Laden der Karte werden Daten (u. a. deine IP-Adresse) an Google übertragen. Mehr dazu in der <a href="${R.datenschutz}#google-maps">Datenschutzerklärung</a>.</p>
    <div class="cta-row" style="justify-content:center;margin-top:.5rem">${process.env.PREVIEW ? '' : '<button class="btn btn--primary btn--sm" type="button" data-map-load><span>Karte laden</span></button>'}<a class="btn btn--ghost-light btn--sm" href="${site.mapsDirections}" target="_blank" rel="noopener"><span>Route in Google Maps</span></a></div>
    <label class="fine" style="display:flex;gap:.5rem;justify-content:center;align-items:center;color:var(--stone-2)"><input type="checkbox" id="map-remember"> Karten künftig automatisch laden</label>
  </div>
</div>`;
