import { site, team, courses, courseCategories, offer } from '../data/site.mjs';
import { R, pic, btn, eyebrow, icon, featureList, offerBlock, finalCta, testimonialsBlock, status, pageHero, split, related, hoursTable, contactLinks, breadcrumbs } from '../lib.mjs';
import { probeForm, memberForm, contactForm } from '../forms.mjs';
import { timetable, mapBlock } from './shared.mjs';

const probe = (l = 'Probetraining vereinbaren') => btn(l, R.probe);
const ghostCall = `<a class="btn btn--ghost-light" href="tel:${site.phoneIntl}">${icon.phone}<span>${site.phone}</span></a>`;
const steps = (items, cls = '') => `<ol class="steps ${cls}">${items.map((s) => `<li class="reveal"><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol>`;
const medNote = '<p class="note note--light">Unser Training ist ein gesundheitsorientiertes Fitnessangebot und ersetzt keine ärztliche Diagnose oder Therapie. Bei akuten Beschwerden, nach Operationen oder bei Vorerkrankungen sprich bitte vorab mit deiner Ärztin oder deinem Arzt – wir stimmen uns gern ab.</p>';

export const ruecken = {
  path: R.ruecken,
  title: 'Rückentraining & Gesundheit in St. Blasien · ALBGYM',
  description: 'Rückentraining im ALBGYM St. Blasien: Rückenschule mit Muskeltest, five®-Beweglichkeitskonzept, milon-Zirkel, RückenFit-Kurse und Rehasport mit Verordnung.',
  image: 'betreuung-balance',
  crumbs: [{ label: 'Gesundheit & Rücken', href: R.ruecken }],
  render() {
    return `${pageHero({ kicker: 'Gesundheit & Rücken', title: 'Rücken stärken.<br><em>Gelenke entlasten.</em>', lead: 'Dosiertes Krafttraining nach einem individuell auf dich abgestimmten Geräteplan, fachkundige Betreuung durch unsere geschulten Trainer sowie Rückenschule und Rückenkurse – für einen gesunden, starken Rücken.', image: 'betreuung-balance', alt: 'Trainer unterstützt Trainierende beim Gleichgewichtstraining', ctas: [btn('Rücken-Check vereinbaren', R.probe + '?ziel=ruecken'), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Mit Bewegung gegen Beschwerden')}<h2 class="h2 reveal-lines">Rückenprobleme –<br><em>eine echte Volks-<br>krankheit.</em></h2></div><p class="reveal">Rückenbeschwerden betreffen sehr viele Menschen. Wir beraten dich eingehend und entwickeln mit dir ein Training, das deinen Rücken Schritt für Schritt belastbarer macht.</p></div>
  <div class="cards cards--2">
    <div class="reveal" id="rueckenschule"><h3>Rückenschule</h3><p>Wir testen deine Rückenmuskulatur und erkennen daraus mögliche Schwächen und Ursachen von Beschwerden – als Grundlage für dein Training.</p></div>
    <div class="reveal" id="five" style="--d:.08s"><h3>five®-Konzept</h3><p>Unser five®-Beweglichkeitskonzept aus dem Schwarzwald: Erlebe, wie sich Muskellängen-Training auf dein Körpergefühl und deine Beweglichkeit auswirkt.</p></div>
    <div class="reveal"><h3>milon-Zirkel</h3><p>Wirke einseitigen Belastungen von Beruf und Alltag mit einem gezielten Kraft- und Muskellängen-Training entgegen.</p><a class="textlink" href="${R.milon}">Zum milon-Zirkel ${icon.arrow}</a></div>
    <div class="reveal" style="--d:.08s"><h3>Rückenkurse</h3><p>RückenFit montags und donnerstags – gezielte Kräftigung und Mobilisation in der Gruppe.</p><a class="textlink" href="${R.kurse}">Zum Kursplan ${icon.arrow}</a></div>
  </div>
</div></section>
${split({ id: 'praevention', img: 'members/elisabeth', ratio: '1/1', alt: 'Elisabeth trainiert mit ihrem Trainer am Rückenstrecker', kicker: 'Prävention & Aufbau', title: 'Nach der Reha<br><em>weiter stark werden.</em>', body: '<p>Viele unserer Mitglieder kommen nach einer Reha oder Operation zu uns, um ihren Körper gezielt wieder aufzubauen. Behutsam, schrittweise und mit persönlicher Begleitung.</p><p><strong>Rehasport</strong> bieten wir an mehreren Tagen pro Woche an – die Teilnahme ist nur mit ärztlicher Verordnung möglich.</p>', extra: `<a class="textlink" href="${R.kurse}">Rehasport-Termine ${icon.arrow}</a>` })}
<section class="sec--tight"><div class="wrap">${medNote}</div></section>
${testimonialsBlock({ title: 'Wieder stark im Rücken.', filter: ['Elisabeth', 'Tino', 'Gisela'] })}
${offerBlock()}
${related([{ label: 'Figur & Ernährung', href: R.figur, img: 'ernaehrung' }, { label: 'Wellness & Regeneration', href: R.wellness, img: 'kurs-stretching' }, { label: 'Personal Training', href: R.pt, img: 'betreuung-ausfallschritt' }])}
${finalCta()}`;
  },
};

export const figur = {
  path: R.figur,
  title: 'Figur & Ernährung · Abnehmen in St. Blasien · ALBGYM',
  description: 'Abnehmen mit System statt Verzicht: Training, Ernährungsberatung mit myline und metabolic balance® und persönliche Betreuung im ALBGYM St. Blasien.',
  image: 'ernaehrung',
  crumbs: [{ label: 'Gesundheit', href: R.ruecken }, { label: 'Figur & Ernährung', href: R.figur }],
  render() {
    return `${pageHero({ kicker: 'Figur & Ernährung', title: 'Abnehmen<br>mit System.<br><em>Statt Verzicht.</em>', lead: 'Für dein gesundes Wohlfühlgewicht kombinieren wir Training, Betreuung und Motivation – damit Veränderung realistisch, messbar und alltagstauglich wird.', image: 'ernaehrung', alt: 'Lachende Frau isst eine bunte Salatschüssel', ctas: [btn('Beratung anfragen', R.mitglied + '?angebot=figur#anfrage'), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap"><div class="intro__grid">
  <div>${eyebrow('Fitness ist das beste Abnehmrezept')}<h2 class="h2 reveal-lines">Training und<br>Ernährung –<br><em>endlich zusammen.</em></h2></div>
  <div class="intro__body" style="padding-top:0"><p class="lead reveal">Muskeltraining erhöht deinen Energiebedarf, eine passende Ernährung macht den Unterschied sichtbar. Wir begleiten dich bei beidem.</p>
  ${featureList([
    { t: 'Training mit Plan', d: 'Krafttraining und Ausdauer, abgestimmt auf dein Ziel.' },
    { t: 'Ernährung, die passt', d: 'Alltagstauglich, ohne Hungern und ohne starre Verbote.' },
    { t: 'Motivation & Messung', d: 'Regelmäßige Gespräche und sichtbare Zwischenziele.' },
  ])}</div>
</div></div></section>
<section class="sec sand" id="beratung"><div class="wrap">
  <div class="sec-head">${eyebrow('Ernährungsberatung')}<h2 class="h2 reveal-lines">Zwei Programme.<br><em>Ein Ziel.</em></h2></div>
  <div class="cards cards--2">
    <div class="reveal"><h3>myline</h3><p>Das Abnehmprogramm, mit dem unser Mitglied Frank seine Ernährung umgestellt hat – kombiniert mit konsequentem Muskeltraining. Wir erklären dir gern, wie es funktioniert.</p></div>
    <div class="reveal" style="--d:.08s"><h3>metabolic balance®</h3><p>Ein Programm zur ganzheitlichen Gewichtsregulierung: Dein persönlicher Ernährungsplan wird auf Basis deiner Blutwerte erstellt – verbunden mit dem passenden Training.</p></div>
  </div>
  <p class="fine" style="margin-top:1.5rem">Konditionen und Ablauf der Programme besprechen wir persönlich mit dir.</p>
</div></section>
${split({ img: 'members/frank', ratio: '1/1', alt: 'Frank beim Training am Latzug', kicker: 'Erfahrung aus der Community', title: '„Ich habe mich<br><em>nie besser gefühlt.“</em>', body: '<p>„Ich habe hier das Abnehmprogramm myline kennengelernt, habe meine Ernährung umgestellt und konsequent Muskeltraining gemacht. Seither habe ich 23 kg abgenommen.“</p><p class="fine">Frank · Mitglied seit 9 Monaten · Individuelle Ergebnisse können abweichen.</p>' })}
${offerBlock()}
${related([{ label: 'Fitness & Krafttraining', href: R.kraft, img: 'geraetetraining' }, { label: 'Cardio & Ausdauer', href: R.cardio, img: 'cardio' }, { label: 'Kursprogramm', href: R.kurse, img: 'kurs-gruppe' }])}
${finalCta()}`;
  },
};

export const wellness = {
  path: R.wellness,
  title: 'Wellness & Regeneration in St. Blasien · ALBGYM',
  description: 'Regeneration im ALBGYM St. Blasien: five®-Beweglichkeit, PelviPower Beckenbodentraining, Avacura Wärme & Kälte sowie Yoga, Pilates und Qi-Gong.',
  image: 'kurs-stretching',
  crumbs: [{ label: 'Wellness & Regeneration', href: R.wellness }],
  render() {
    return `${pageHero({ kicker: 'Wellness & Regeneration', title: 'Erholung<br>ist Teil<br><em>des Trainings.</em>', lead: 'Wer regelmäßig trainiert, braucht Phasen der Erholung. Unsere Wellness- und Regenerationsangebote helfen dir, beweglich, entspannt und leistungsfähig zu bleiben.', image: 'kurs-stretching', alt: 'Gruppe beim ruhigen Dehnen im Kursraum', ctas: [btn('Beratung vereinbaren', R.kontakt + '?betreff=Wellness%20%26%20Regeneration#kontakt'), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Angebote')}<h2 class="h2 reveal-lines">Ankommen.<br>Durchatmen.<br><em>Auftanken.</em></h2></div><p class="reveal">Alle Angebote sind ohne Heilversprechen zu verstehen – sie unterstützen dein Wohlbefinden als Ergänzung zu deinem Training. Details, Verfügbarkeit und Konditionen besprechen wir gern persönlich.</p></div>
  <div class="cards cards--2">
    <div class="reveal" id="five"><h3>five® Beweglichkeit</h3><p>Muskellängen- und Faszientraining an speziellen five®-Geräten. Wenige, kontrollierte Bewegungen gegen die Gewohnheiten des Alltags – für ein freieres Körpergefühl.</p><a class="textlink" href="${R.ruecken}#five">Mehr erfahren ${icon.arrow}</a></div>
    <div class="reveal" id="pelvipower" style="--d:.08s"><h3>PelviPower</h3><p>Beckenbodentraining im Sitzen – bekleidet und diskret. Eine komfortable Ergänzung für alle, die ihre Körpermitte gezielt stärken möchten.</p><a class="textlink" href="${R.kontakt}?betreff=PelviPower#kontakt">Termin anfragen ${icon.arrow}</a></div>
    <div class="reveal" id="avacura"><h3>Avacura Wärme &amp; Kälte</h3><p>Gezielte Wärme- und Kältereize für Regeneration und Wohlgefühl nach dem Training oder als bewusste Auszeit vom Alltag.</p><a class="textlink" href="${R.kontakt}?betreff=Avacura%20W%C3%A4rme%20%26%20K%C3%A4lte#kontakt">Termin anfragen ${icon.arrow}</a></div>
    <div class="reveal" style="--d:.08s"><h3>Yoga, Pilates &amp; Qi-Gong</h3><p>Ruhige Kurse für Kraft, Beweglichkeit, Atmung und Konzentration – im regulären Kursprogramm.</p><a class="textlink" href="${R.kurse}">Zum Kursplan ${icon.arrow}</a></div>
  </div>
</div></section>
${split({ img: 'gemeinschaft-lachen', ratio: '3/2', alt: 'Zwei Trainierende lachen gemeinsam nach dem Training', kicker: 'Longevity', title: 'Gesund älter werden<br><em>beginnt heute.</em>', body: '<p>Kraft, Beweglichkeit, Koordination und Erholung sind die Bausteine für ein aktives, selbstbestimmtes Leben – in jedem Alter. Genau dafür steht das ALBGYM.</p>', extra: `<div class="cta-row">${probe()}</div>` })}
${related([{ label: 'Gesundheit & Rücken', href: R.ruecken, img: 'betreuung-balance' }, { label: 'Kursprogramm', href: R.kurse, img: 'kurs-gruppe' }, { label: 'ALBGYM 3.0', href: R.neubau, img: 'neubau-baustelle' }])}
${finalCta()}`;
  },
};

export const kurse = {
  path: R.kurse,
  title: 'Kursprogramm & Kursplan · Fitnesskurse in St. Blasien · ALBGYM',
  description: 'Fitnesskurse in St. Blasien: Yoga, Pilates, Qi-Gong, RückenFit, HIIT, Tabata, Indoor Cycling, Kickboxen und Rehasport. Aktueller Wochenplan im ALBGYM.',
  image: 'kurs-gruppe',
  crumbs: [{ label: 'Kursprogramm', href: R.kurse }],
  ld() {
    return [{
      '@context': 'https://schema.org', '@type': 'ItemList', name: 'Kursprogramm ALBGYM St. Blasien',
      itemListElement: Object.keys(courses).map((n, i) => ({ '@type': 'ListItem', position: i + 1, name: n })),
    }];
  },
  render() {
    const byCat = Object.entries(courseCategories).map(([k, label]) => ({ k, label, items: Object.entries(courses).filter(([, c]) => c.cat === k) }));
    return `${pageHero({ kicker: 'Kurse & Community', title: 'Gemeinsam<br><em>stärker.</em>', lead: 'Lass dich von unserer Auswahl an Fitnesskursen inspirieren: von Yoga und Qi-Gong bis Kickboxen, von RückenFit bis HIIT. Für Mitglieder im Kursprogramm inklusive.', image: 'kurs-gruppe', alt: 'Kursgruppe trainiert gemeinsam mit Langhanteln', ctas: [btn('Kurs ausprobieren', R.probe + '?ziel=kurse'), btn('Zum Wochenplan', '#kursplan', { variant: 'ghost-light' })], crumbs: this.crumbs })}
<section class="sec" id="kursplan"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Wochenplan')}<h2 class="h2 reveal-lines">Dein Kursplan.</h2></div><p class="reveal">Wähle einen Tag oder filtere nach Kategorie. Für eine Kursanfrage oder Fragen zur Teilnahme sind wir gern für dich da – telefonisch oder über das Formular.</p></div>
  ${timetable()}
</div></section>
<section class="sec sand"><div class="wrap">
  <div class="sec-head">${eyebrow('Kurse im Überblick')}<h2 class="h2 reveal-lines">Für jedes Ziel<br><em>der richtige Kurs.</em></h2></div>
  <div class="cards cards--3">${byCat
    .map((c) => `<div class="reveal"><h3>${c.label}</h3>${c.items.map(([n, d]) => `<p><strong style="color:var(--ink);font-weight:600">${n}</strong><br>${d.desc}</p>`).join('')}<a class="textlink" href="${R.kontakt}?betreff=${encodeURIComponent('Kursanfrage: ' + c.label)}#kontakt">Kurs anfragen ${icon.arrow}</a></div>`)
    .join('')}</div>
</div></section>
${testimonialsBlock({ title: 'Kurse verbinden.', filter: ['Nadja', 'Isabelle', 'Janic & Magnus'] })}
${offerBlock()}
${finalCta({ image: 'kurs-energie', alt: 'Kursgruppe mit Hanteln' })}`;
  },
};

export const neubau = {
  path: R.neubau,
  title: 'ALBGYM 3.0 · Neubau 2027 im EDEKA-Neubau St. Blasien',
  description: 'Das neue ALBGYM 3.0: über 1.100 m² im Obergeschoss des EDEKA-Neubaus in St. Blasien, geplanter Umzug Frühjahr 2027. EGYM schon heute, Skillcourt und Lounge geplant.',
  image: 'neubau-baustelle',
  crumbs: [{ label: 'ALBGYM 3.0', href: R.neubau }],
  render() {
    return `<section class="phero" style="min-height:92svh">
  <div class="phero__media" data-parallax>${pic('neubau-baustelle', { alt: 'Sascha vor dem eingerüsteten EDEKA-Neubau in St. Blasien', eager: true, priority: true })}</div>
  <div class="phero__inner wrap">
    ${breadcrumbs(this.crumbs)}
    ${eyebrow('Neubau · Geplanter Umzug Frühjahr 2027')}
    <h1 class="display reveal-lines">ALBGYM<br><em>3.0</em></h1>
    <p class="lead">Die modernste Fitness- &amp; Gesundheitswelt im Südschwarzwald entsteht. Mit modernster Infrastruktur, persönlicher Begleitung, familiärer Atmosphäre und viel Herz für deine Fitness und Gesundheit.</p>
    <div class="cta-row">${probe('Schon jetzt starten')}${btn('Updates erhalten', R.kontakt + '?betreff=Updates%20zum%20ALBGYM%203.0#kontakt', { variant: 'ghost-light' })}</div>
  </div>
</section>
<section class="sec future"><div class="wrap">
  <div class="future__head">
    <div>${eyebrow('Das Projekt')}<h2 class="h2 reveal-lines">Über 1.100 m²<br><em>im Obergeschoss<br>des EDEKA-Neubaus.</em></h2></div>
    <p class="reveal" style="color:var(--stone-2)">Im Neubau des EDEKA in St. Blasien entsteht im Obergeschoss auf über 1.100 Quadratmetern das neue ALBGYM 3.0. Wenn der Bau planmäßig voranschreitet, ziehen wir im Frühjahr 2027 in unser neues Studio um. Bis dahin trainierst du wie gewohnt in der Todtmooser Str. 8.</p>
  </div>
  <div class="stats">
    <div class="stat"><span class="stat__v">1.100<sup>m²+</sup></span><span class="stat__l">geplante Fläche</span></div>
    <div class="stat"><span class="stat__v">2027</span><span class="stat__l">geplanter Umzug im Frühjahr</span></div>
    <div class="stat"><span class="stat__v">Herbst 26</span><span class="stat__l">EGYM-Geräte bereits im aktuellen Studio</span></div>
    <div class="stat"><span class="stat__v">1</span><span class="stat__l">Team, das mit dir umzieht</span></div>
  </div>
  <div class="phases">
    <div class="phase reveal">${status('now')}<h3>Schon heute</h3><ul><li>EGYM-Trainingswelt – seit Herbst 2026</li><li>milon-Zirkel und five®</li><li>Freihantel-, Geräte- und Cardiotraining</li><li>Kursprogramm, Rückenschule, Ernährungsberatung</li><li>Persönliche Betreuung</li></ul></div>
    <div class="phase reveal" style="--d:.1s">${status('confirmed')}<h3>Im Bau</h3><ul><li>Neues Studio im Obergeschoss des EDEKA-Neubaus</li><li>Über 1.100 m² Fläche</li><li>Umzug bei planmäßigem Baufortschritt im Frühjahr 2027</li></ul></div>
    <div class="phase reveal" style="--d:.2s">${status('planned')}<h3>Geplant</h3><ul><li>Skillcourt für Körper und Kopf</li><li>Lichtdurchflutete Räume</li><li>Cardio mit Blick über die Dächer von St. Blasien</li><li>Hantel- und Functionalbereich</li><li>Gemütliche Lounge</li></ul></div>
  </div>
  <p class="fine" style="margin-top:2rem">Alle Angaben zum Neubau entsprechen dem aktuellen Planungsstand und können sich im Bauverlauf ändern.</p>
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Was dich erwartet')}<h2 class="h2 reveal-lines">Training und Begegnung<br><em>gehören zusammen.</em></h2></div><p class="reveal">Bewährtes und Neues kommen mit ins ALBGYM 3.0.</p></div>
  ${featureList([
    { t: 'Persönlich betreut statt anonym trainieren', d: 'Bei uns bist du keine Nummer: Wir begleiten dich familiär, persönlich und durchgängig – damit du dich wohlfühlst und dranbleibst.' },
    { t: 'Modernste Trainingswelt im Südschwarzwald', d: 'Mit den elektronischen EGYM-Geräten trainierst du besonders sicher und kontrolliert, während Hantel- und Functionalbereich allen Raum geben, die richtig Gas geben wollen.' },
    { t: 'Training für Jung & Alt', d: 'Unterschiedliche Generationen trainieren wertschätzend miteinander – vom gesundheitsorientierten Einstieg bis zum ambitionierten Workout.' },
    { t: 'Gesundheit, Longevity und Wohlfühlambiente', d: 'Lichtdurchflutete Räume, Cardio mit Ausblick, der Skillcourt für mentale Stärke und eine gemütliche Lounge.' },
    { t: 'Rücken stärken. Gelenke entlasten.', d: 'Mit bewährten Konzepten wie five® fördern wir Beweglichkeit und unterstützen dich gezielt.' },
    { t: 'Fitter für Hobby, Alltag und Kopf.', d: 'Der neue Skillcourt unterstützt Koordination, Reaktion und mentale Fitness.' },
  ], 'flist--2')}
</div></section>
${split({ img: 'skillcourt', alt: 'Training auf dem Skillcourt', ratio: '4/5', kicker: 'Highlight · Geplant', title: 'Skillcourt –<br><em>Training für Körper und Kopf.</em>', body: `<p>${status('planned')}</p><p>Reaktion, Koordination, Konzentration, Gleichgewicht und schnelles, vernetztes Denken: Skills, die darüber entscheiden, wie sicher und leistungsfähig wir uns im Alltag fühlen.</p>`, extra: `<a class="textlink" href="${R.skillcourt}">Mehr zum Skillcourt ${icon.arrow}</a>` })}
${split({ reverse: true, img: 'egym', alt: 'EGYM-Gerät mit Touchdisplay', ratio: '3/2', kicker: 'Schon heute verfügbar', title: 'Die neue Trainingsqualität<br><em>startet jetzt.</em>', body: `<p>${status('now')}</p><p>Du musst nicht bis zum Umzug warten: Die neue EGYM-Trainingswelt erlebst du bereits seit Herbst 2026 bei uns im Studio.</p>`, extra: `<a class="textlink" href="${R.egym}">EGYM entdecken ${icon.arrow}</a>` })}
${offerBlock()}
${finalCta({ title: 'Der Umzug kommt.<br>Dein Start nicht erst dann.', text: 'Trainiere schon heute mit EGYM, persönlicher Betreuung und Kursprogramm – und zieh mit uns ins ALBGYM 3.0.' })}`;
  },
};

export const mitglied = {
  path: R.mitglied,
  title: 'Mitgliedschaften & Angebote · 4 Wochen ALBGYM erleben · St. Blasien',
  description: 'Das 4-Wochen-Schnupper-Abo im ALBGYM St. Blasien: flexibel, Startpaket geschenkt, individueller Trainingsplan und Kursprogramm. Jetzt Angebot sichern.',
  image: 'kurs-energie',
  crumbs: [{ label: 'Mitgliedschaften & Angebote', href: R.mitglied }],
  render() {
    return `<section class="phero phero--short">
  <div class="phero__media" data-parallax>${pic('highfive-team', { alt: 'Trainierende klatschen sich im Studio ab', eager: true, priority: true })}</div>
  <div class="phero__inner wrap">${breadcrumbs(this.crumbs)}${eyebrow('Mitgliedschaften & Angebote')}<h1 class="display reveal-lines">Dein Einstieg<br><em>ins ALBGYM.</em></h1><p class="lead">Lerne uns in Ruhe kennen: mit unserem 4-Wochen-Schnupper-Abo, persönlicher Beratung zur passenden Mitgliedschaft oder direkt online.</p></div>
</section>
${offerBlock()}
<section class="sec sand"><div class="wrap">
  <div class="sec-head">${eyebrow('So einfach geht’s')}<h2 class="h2 reveal-lines">In drei Schritten<br><em>zum Start.</em></h2></div>
  ${steps([
    { t: 'Anfrage senden', d: 'Formular ausfüllen oder anrufen – das dauert eine Minute.' },
    { t: 'Persönlicher Termin', d: 'Wir melden uns, beraten dich und vereinbaren deinen ersten Termin.' },
    { t: 'Loslegen', d: 'Mit Einweisung, individuellem Trainingsplan und Kursprogramm.' },
  ])}
</div></section>
<section class="sec" id="anfrage"><div class="wrap contact__grid">
  <div>
    ${eyebrow('Mitgliedschaftsanfrage')}
    <h2 class="h2 reveal-lines">Angebot sichern<br><em>oder beraten lassen.</em></h2>
    <p class="muted">Sag uns, was dich interessiert – wir melden uns zeitnah persönlich bei dir, beantworten deine Fragen und reservieren dir dein Angebot. Unverbindlich.</p>
    <div class="cards" style="margin-top:2.5rem"><div><h3>Lieber direkt online?</h3><p>Schließe deine Mitgliedschaft bequem über unseren Online-Shop ab.</p>${btn('Online Mitglied werden', site.membershipShop, { variant: 'ghost', attrs: 'rel="noopener"' })}</div></div>
    <div style="margin-top:2.5rem">${contactLinks()}</div>
  </div>
  <div class="formcard">${memberForm()}</div>
</div></section>
${testimonialsBlock()}
${finalCta()}`;
  },
};

export const probetraining = {
  path: R.probe,
  title: 'Probetraining vereinbaren · ALBGYM St. Blasien',
  description: 'Vereinbare dein Probetraining im ALBGYM St. Blasien: persönliche Beratung, Einweisung und erstes Training mit unserem Trainerteam. Online anfragen oder anrufen.',
  image: 'betreuung-ausfallschritt',
  crumbs: [{ label: 'Probetraining', href: R.probe }],
  render() {
    return `<section class="phero phero--short">
  <div class="phero__media" data-parallax>${pic('betreuung-ausfallschritt', { alt: 'Trainer betreut ein Probetraining', eager: true, priority: true })}</div>
  <div class="phero__inner wrap">${breadcrumbs(this.crumbs)}${eyebrow('Probetraining')}<h1 class="display reveal-lines">Dein erstes Training<br><em>beginnt hier.</em></h1><p class="lead">Lerne das ALBGYM, unser Team und deine Möglichkeiten persönlich kennen. Schick uns deine Anfrage – wir melden uns und vereinbaren deinen Termin.</p></div>
</section>
<section class="sec sand"><div class="wrap contact__grid">
  <div>
    <h2 class="eyebrow">So läuft dein Probetraining</h2>
    <ol class="flist">${[
      ['Anfrage', 'Du sendest uns deine Wunschzeit und deine Ziele.'],
      ['Terminbestätigung', 'Wir rufen dich an und bestätigen deinen persönlichen Termin.'],
      ['Kennenlernen', 'Gespräch über deine Ziele, Studiorundgang und erstes Training mit Einweisung.'],
      ['Dein Plan', 'Wir zeigen dir, wie es weitergehen kann – ganz ohne Druck.'],
    ].map(([t, d], i) => `<li class="flist__item"><span class="flist__n">${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
    <div style="margin-top:2.5rem">${eyebrow('Öffnungszeiten')}${hoursTable()}<p class="fine" data-open-state style="margin-top:1rem"></p></div>
    <div style="margin-top:2rem">${contactLinks()}</div>
  </div>
  <div class="formcard" id="anfrage">${probeForm()}</div>
</div></section>
${testimonialsBlock()}
${related([{ label: 'Fitness & Krafttraining', href: R.kraft, img: 'geraetetraining' }, { label: 'Gesundheit & Rücken', href: R.ruecken, img: 'betreuung-balance' }, { label: 'Kursprogramm', href: R.kurse, img: 'kurs-gruppe' }], 'Was dich erwartet')}`;
  },
};

export const kontakt = {
  path: R.kontakt,
  title: 'Kontakt & Anfahrt · ALBGYM St. Blasien',
  description: 'Kontakt zum ALBGYM St. Blasien: Todtmooser Str. 8, 79837 St. Blasien · Tel. 07672 1001 · info@albgym.de. Öffnungszeiten, Anfahrt und Kontaktformular.',
  image: 'gemeinschaft-gruppe',
  crumbs: [{ label: 'Kontakt', href: R.kontakt }],
  render() {
    return `<section class="phero phero--short">
  <div class="phero__media" data-parallax>${pic('gemeinschaft-gruppe', { alt: 'Gut gelaunte Gruppe im Studio', eager: true, priority: true })}</div>
  <div class="phero__inner wrap">${breadcrumbs(this.crumbs)}${eyebrow('Kontakt')}<h1 class="display reveal-lines">Wir sind<br><em>für dich da.</em></h1><p class="lead">Du hast Fragen? Schreib uns – wir melden uns schnellstmöglich. Oder sprich direkt mit unserem Team.</p></div>
</section>
<section class="sec sand"><div class="wrap contact__grid">
  <div>
    ${eyebrow('Direkter Draht')}
    ${contactLinks()}
    <p style="margin-top:1.5rem"><a class="textlink" href="${site.instagram}" target="_blank" rel="noopener">${icon.insta} Instagram ${site.instagramHandle}</a></p>
    <div style="margin-top:3rem">${eyebrow('Öffnungszeiten')}${hoursTable()}<p class="fine" data-open-state style="margin-top:1rem"></p></div>
  </div>
  <div class="formcard" id="kontakt">${contactForm()}</div>
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Anfahrt')}<h2 class="h2 reveal-lines">Mitten in<br><em>St. Blasien.</em></h2></div><div><address class="lead"><strong>${site.longName}</strong><br>${site.street}<br>${site.zip} ${site.city}</address><p style="margin-top:1rem"><a class="textlink" href="${site.mapsDirections}" target="_blank" rel="noopener">Route planen ${icon.arrow}</a></p></div></div>
  ${mapBlock()}
  <p class="fine" style="margin-top:1rem">Hinweis: Mit dem geplanten Umzug ins ALBGYM 3.0 (EDEKA-Neubau, voraussichtlich Frühjahr 2027) ändert sich unsere Adresse. Wir informieren rechtzeitig.</p>
</div></section>`;
  },
};

export const about = {
  path: R.about,
  title: 'Über ALBGYM · Fitness- & Gesundheitszentrum St. Blasien',
  description: 'Lerne das ALBGYM St. Blasien kennen: familiär geführt, qualifiziertes Trainerteam, Mitglieder von 14 bis 88 Jahren und ein Neubau für 2027.',
  image: 'gemeinschaft-lachen',
  crumbs: [{ label: 'Über uns', href: R.about }],
  render() {
    return `${pageHero({ kicker: 'Über ALBGYM', title: 'Familiär geführt.<br><em>Mit Herz für Fitness<br>und Gesundheit.</em>', lead: 'Dein Fitness- und Gesundheitszentrum in St. Blasien. Deine Wünsche und Ziele stehen im Mittelpunkt unserer Arbeit – mit einem Team, das dir mit Rat und Tat zur Seite steht.', image: 'gemeinschaft-lachen', alt: 'Zwei Trainierende lachen gemeinsam im Studio', ctas: [probe(), ghostCall], crumbs: this.crumbs })}
<section class="sec" id="studio"><div class="wrap"><div class="intro__grid">
  <div>${eyebrow('Unsere Haltung')}<h2 class="h2 reveal-lines">Deine Experten<br>für Fitness, Figur<br><em>und Gesundheit.</em></h2></div>
  <div class="intro__body" style="padding-top:0"><p class="lead reveal">Mit einem individuell auf deine Ziele abgestimmten Training kannst du deine Fitness bis ins hohe Alter bewahren. Auf diesem Weg unterstützen wir dich mit unserem ausgebildeten, erfahrenen Trainerteam und den neuesten Trainingstechnologien.</p>
  ${featureList([
    { t: 'Qualifizierte Betreuung', d: 'Deine Wünsche und Ziele stehen im Mittelpunkt unserer Arbeit.' },
    { t: 'Trainingsvielfalt', d: 'Mehr Kraft, mehr Ausdauer, einfach abnehmen oder fitter werden.' },
    { t: 'Gruppenkurse', d: 'Ein Kursprogramm, das inspiriert und verbindet.' },
    { t: 'Professionelle Trainer', d: 'Ein Team, das dir mit Rat und Tat zur Seite steht.' },
  ])}</div>
</div></div></section>
<section class="sec sand" id="team"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Unser Team')}<h2 class="h2 reveal-lines">Die Menschen<br><em>hinter dem ALBGYM.</em></h2></div><p class="reveal">Persönlich betreut statt anonym trainieren: Unser Team kennt deinen Namen, deine Ziele und deinen Weg.</p></div>
  <ul class="team">${team.map((n) => `<li class="reveal">${pic(`team/${n.toLowerCase()}`, { alt: `${n} aus dem ALBGYM-Team`, sizes: '(min-width: 960px) 18vw, 45vw', ratio: '1/1' })}<span>${n}</span></li>`).join('')}</ul>
</div></section>
<section class="qband"><div class="wrap"><blockquote>Von <em>14 bis 88</em> –<br>bei uns trainieren Generationen miteinander.</blockquote><cite>Die ALBGYM Community</cite></div></section>
${split({ img: 'neubau-baustelle', alt: 'Sascha vor dem EDEKA-Neubau', ratio: '4/3', kicker: 'Die Zukunft', title: 'Auf dem Weg<br><em>zum ALBGYM 3.0.</em>', body: '<p>Im Frühjahr 2027 wollen wir in den EDEKA-Neubau in St. Blasien umziehen – auf über 1.100 m², mit modernster Infrastruktur und der gleichen familiären Atmosphäre.</p>', extra: `<a class="textlink" href="${R.neubau}">Zum Neubau ${icon.arrow}</a>` })}
<section class="sec--tight"><div class="wrap"><div class="contact__grid">
  <div>${eyebrow('Öffnungszeiten')}${hoursTable()}<p class="fine" data-open-state style="margin-top:1rem"></p></div>
  <div>${eyebrow('Kontakt')}${contactLinks()}</div>
</div></div></section>
${testimonialsBlock()}
${finalCta()}`;
  },
};
