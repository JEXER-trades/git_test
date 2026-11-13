import { R, esc, icon } from './lib.mjs';
import { site } from './data/site.mjs';

// All forms POST to /api/anfrage.php (progressively enhanced via fetch).
// Spam protection: honeypot field + signed time token (see public/api/anfrage.php).
const shell = (type, inner, { submit, id = 'anfrage', title, intro }) => `<form class="form" id="${id}-form" action="/api/anfrage.php" method="post" novalidate data-form="${type}">
  ${title ? `<h2 class="h3">${title}</h2>` : ''}${intro ? `<p class="form__intro">${intro}</p>` : ''}
  <input type="hidden" name="form" value="${type}">
  <input type="hidden" name="ts" value="" data-ts>
  <input type="hidden" name="page" value="" data-page>
  <div class="hp" aria-hidden="true"><label>Firma (bitte leer lassen)<input type="text" name="firma" tabindex="-1" autocomplete="off"></label></div>
  ${inner}
  <div class="field field--check">
    <input type="checkbox" id="${id}-consent" name="consent" value="1" required>
    <label for="${id}-consent">Ich willige ein, dass ALBGYM meine Angaben zur Bearbeitung meiner Anfrage verarbeitet und mich dazu kontaktiert. Hinweise in der <a href="${R.datenschutz}#formulare">Datenschutzerklärung</a>. Widerruf jederzeit möglich. <span class="req" aria-hidden="true">*</span></label>
    <p class="field__err" id="${id}-consent-err"></p>
  </div>
  <div class="form__foot">
    <button class="btn btn--primary" type="submit"><span>${submit}</span>${icon.arrow}</button>
    <p class="fine">* Pflichtfeld · Lieber persönlich? <a href="tel:${site.phoneIntl}">${site.phone}</a></p>
  </div>
  <div class="form__status" role="status" aria-live="polite" tabindex="-1"></div>
</form>`;

const field = (id, name, label, { type = 'text', required = false, auto = '', placeholder = '', full = false, inputmode = '' } = {}) => `<div class="field${full ? ' field--full' : ''}">
  <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
  <input id="${id}" name="${name}" type="${type}"${required ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}${inputmode ? ` inputmode="${inputmode}"` : ''} aria-describedby="${id}-err">
  <p class="field__err" id="${id}-err"></p>
</div>`;

const textarea = (id, name, label, { required = false, placeholder = '' } = {}) => `<div class="field field--full">
  <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
  <textarea id="${id}" name="${name}" rows="4"${required ? ' required' : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''} aria-describedby="${id}-err"></textarea>
  <p class="field__err" id="${id}-err"></p>
</div>`;

const select = (id, name, label, options, { required = false } = {}) => `<div class="field">
  <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
  <div class="select"><select id="${id}" name="${name}"${required ? ' required' : ''} aria-describedby="${id}-err">${options.map(([v, l]) => `<option value="${esc(v)}">${l}</option>`).join('')}</select></div>
  <p class="field__err" id="${id}-err"></p>
</div>`;

const chips = (name, legend, options) => `<fieldset class="field field--full chips"><legend>${legend}</legend><div class="chips__list">${options
  .map((o, i) => `<label class="chip"><input type="checkbox" name="${name}[]" value="${esc(o)}"><span>${o}</span></label>`)
  .join('')}</div></fieldset>`;

const person = (id) =>
  `<div class="form__grid">
  ${field(`${id}-name`, 'name', 'Vor- und Nachname', { required: true, auto: 'name' })}
  ${field(`${id}-phone`, 'phone', 'Telefon', { type: 'tel', required: true, auto: 'tel', inputmode: 'tel' })}
  ${field(`${id}-email`, 'email', 'E-Mail', { type: 'email', required: true, auto: 'email', full: true })}
</div>`;

export const probeForm = ({ id = 'probe' } = {}) =>
  shell(
    'probetraining',
    `${person(id)}
  <div class="form__grid">
    ${field(`${id}-date`, 'wunschtag', 'Wunschtag (optional)', { type: 'date' })}
    ${select(`${id}-time`, 'tageszeit', 'Bevorzugte Tageszeit', [['', 'Egal – wir finden einen Termin'], ['Vormittag', 'Vormittag'], ['Nachmittag', 'Nachmittag'], ['Abend', 'Abend']])}
  </div>
  ${chips('interessen', 'Was interessiert dich? (optional)', ['Muskelaufbau & Kraft', 'Rücken & Gesundheit', 'Abnehmen & Figur', 'EGYM & Gerätetraining', 'Kurse', 'Personal Training', 'Jugendtraining (ab 14)'])}
  ${textarea(`${id}-msg`, 'nachricht', 'Deine Ziele oder Fragen (optional)', { placeholder: 'z. B. Wiedereinstieg nach längerer Pause, Training nach der Reha …' })}`,
    { submit: 'Probetraining anfragen', id }
  );

export const memberForm = ({ id = 'anfrage' } = {}) =>
  shell(
    'mitgliedschaft',
    `<div class="form__grid">
    ${select(`${id}-offer`, 'angebot', 'Ich interessiere mich für', [
      ['4-Wochen-Schnupper-Abo', '4-Wochen-Schnupper-Abo (69 € / mtl.)'],
      ['Mitgliedschaft – Beratung', 'Mitgliedschaft – persönliche Beratung'],
      ['Personal Training', 'Personal Training'],
      ['Jugendtraining', 'Jugendtraining (ab 14 Jahren)'],
      ['Gesundheit & Rücken', 'Gesundheit & Rücken'],
      ['Figur & Ernährung', 'Figur & Ernährung'],
    ], { required: true })}
    ${select(`${id}-contact`, 'kontaktweg', 'Bevorzugter Kontaktweg', [['Telefon', 'Telefon'], ['E-Mail', 'E-Mail'], ['WhatsApp', 'WhatsApp']])}
  </div>
  ${person(id)}
  ${textarea(`${id}-msg`, 'nachricht', 'Nachricht (optional)')}`,
    { submit: 'Anfrage senden', id }
  );

export const contactForm = ({ id = 'kontakt' } = {}) =>
  shell(
    'kontakt',
    `<div class="form__grid">
    ${field(`${id}-name`, 'name', 'Vor- und Nachname', { required: true, auto: 'name' })}
    ${field(`${id}-email`, 'email', 'E-Mail', { type: 'email', required: true, auto: 'email' })}
    ${field(`${id}-phone`, 'phone', 'Telefon (optional)', { type: 'tel', auto: 'tel', inputmode: 'tel' })}
    ${field(`${id}-subject`, 'betreff', 'Betreff', { required: true })}
  </div>
  ${textarea(`${id}-msg`, 'nachricht', 'Deine Nachricht', { required: true })}`,
    { submit: 'Nachricht senden', id }
  );
