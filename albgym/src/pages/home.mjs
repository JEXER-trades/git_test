import { site, schedule, courses, courseCategories } from '../data/site.mjs';
import { R, pic, btn, eyebrow, icon, featureList, offerBlock, finalCta, testimonialsBlock, status, hoursTable } from '../lib.mjs';
import { timetable } from './shared.mjs';

const trainings = [
  { t: 'Fitness & Krafttraining', d: 'Mehr Kraft für Alltag, Figur und Gesundheit – mit Plan und persönlicher Begleitung.', href: R.kraft, img: 'geraetetraining', alt: 'Frau trainiert konzentriert an einer Kraftstation' },
  { t: 'Freihanteltraining', d: 'Kurz- und Langhanteln für alle, die Muskulatur gezielt und frei aufbauen wollen.', href: R.kraft + '#freihantel', img: 'kurzhantel', alt: 'Mann beim Bizepstraining mit Kurzhantel' },
  { t: 'Gerätetraining', d: 'Hochmoderne Geräte für sicheres, wirksames Training jeder Muskelgruppe.', href: R.egym + '#geraete', img: 'latzug', alt: 'Trainierende am Latzug' },
  { t: 'Cardio', d: 'Ergometer, Stepper, Rudergeräte und Cardio-Zirkel für deine Ausdauer.', href: R.cardio, img: 'cardio', alt: 'Ausdauertraining auf Laufbändern' },
  { t: 'Milon-Zirkeltraining', d: 'Kraft- und Ausdauerzirkel, der sich auf dich einstellt – effektiv in kurzer Zeit.', href: R.milon, img: 'milon-five', alt: 'Training am milon-Zirkel und five-Gerät', tag: 'now' },
  { t: 'EGYM-Trainingswelt', d: 'Seit Herbst 2026 bei uns: vernetztes Training, das deinen Fortschritt misst und steuert.', href: R.egym, img: 'egym', alt: 'Trainierende am EGYM-Gerät mit digitalem Display', tag: 'now' },
  { t: 'Skillcourt', d: 'Reaktion, Koordination und Konzentration – Training für Körper und Kopf.', href: R.skillcourt, img: 'skillcourt', alt: 'Training auf dem Skillcourt mit Bodenprojektion', tag: 'planned' },
  { t: 'Leistungssport & Bodybuilding', d: 'Hantel- und Functionalbereich für alle, die richtig Gas geben wollen.', href: R.bodybuilding, img: 'bodybuilding', alt: 'Athlet beim Schulterdrücken mit Kurzhanteln' },
  { t: 'Personal Training', d: 'Dein Ziel, dein Plan, deine Trainerin oder dein Trainer – individuell und langfristig.', href: R.pt, img: 'betreuung-ausfallschritt', alt: 'Trainer korrigiert eine Übung im Personal Training' },
];

const health = [
  { t: 'Rückentraining', d: 'Rückenschule, dosiertes Krafttraining nach individuellem Geräteplan und RückenFit-Kurse.', href: R.ruecken, img: 'betreuung-balance' },
  { t: 'Beweglichkeit mit five®', d: 'Das Beweglichkeitskonzept aus dem Schwarzwald für Muskellängen- und Faszientraining.', href: R.ruecken + '#five', img: 'milon-five' },
  { t: 'Figur & Ernährung', d: 'Abnehmen mit System statt Verzicht – Training, Betreuung und Motivation.', href: R.figur, img: 'ernaehrung' },
  { t: 'Ernährungsberatung', d: 'myline und metabolic balance® – alltagstaugliche Ernährung, die zu dir passt.', href: R.figur + '#beratung', img: 'gemeinschaft-lachen' },
  { t: 'PelviPower', d: 'Beckenbodentraining im Sitzen – diskret und bekleidet.', href: R.wellness + '#pelvipower', img: 'kurs-stretching' },
  { t: 'Avacura Wärme & Kälte', d: 'Regeneration und Wohlgefühl durch gezielte Temperaturreize.', href: R.wellness + '#avacura', img: 'bauchtraining' },
  { t: 'Prävention & Gesundheit', d: 'Gesundheitsorientiertes Training, Rehasport mit Verordnung und Aufbau nach der Reha.', href: R.ruecken + '#praevention', img: 'hero-kraft-generationen' },
];

export default {
  path: '/',
  title: 'ALBGYM St. Blasien · Fitness- & Gesundheitszentrum im Südschwarzwald',
  description: 'Fitnessstudio in St. Blasien: persönliche Betreuung, EGYM, milon, Rückentraining, Kurse und Personal Training für alle Generationen. Jetzt Probetraining vereinbaren.',
  render() {
    return `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__media" data-parallax>${pic('hero-kraft-generationen', { alt: 'Älterer Mann trainiert kraftvoll und konzentriert an der Schulterpresse', eager: true, priority: true, sizes: '100vw' })}</div>
  <div class="wrap wrap--wide hero__inner">
    <p class="eyebrow fade-up" style="--d:.2s">Fitness- &amp; Gesundheitszentrum · St. Blasien</p>
    <h1 class="display reveal-lines is-in" id="hero-title">Stärker leben.<br><span class="l2">Gesünder fühlen.</span></h1>
    <p class="lead fade-up" style="--d:.75s">Dein Fitness- und Gesundheitszentrum im Südschwarzwald. Persönliche Betreuung, modernste Trainingskonzepte und eine Atmosphäre, in der du dich wohlfühlst.</p>
    <div class="cta-row fade-up" style="--d:.9s">${btn('Probetraining vereinbaren', R.probe)}${btn('ALBGYM entdecken', '#entdecken', { variant: 'ghost-light' })}</div>
    <div class="hero__meta fade-up" style="--d:1.1s">
      <div><strong>Heute</strong><span data-open-state>Mo · Mi · Fr 08:00–21:30</span></div>
      <div><strong>Adresse</strong><a href="${site.mapsDirections}" target="_blank" rel="noopener">${site.street}, ${site.zip} ${site.city}</a></div>
      <div><strong>Direkt anrufen</strong><a href="tel:${site.phoneIntl}">${site.phone}</a></div>
      <a class="hero__scroll" href="#entdecken"><i aria-hidden="true"></i>Scrollen</a>
    </div>
  </div>
</section>

<section class="sec intro" id="entdecken" aria-labelledby="intro-title">
  <div class="wrap">
    <div class="intro__grid">
      <div class="intro__head">
        ${eyebrow('Die ALBGYM Philosophie')}
        <h2 class="h2 reveal-lines" id="intro-title">Mehr als Fitness.<br>Ein Gefühl von<br><em>Lebensqualität.</em></h2>
      </div>
      <div class="intro__body">
        <p class="lead reveal">Mit einem individuell auf deine Ziele abgestimmten Training kannst du deine Fitness bis ins hohe Alter bewahren. Auf diesem Weg begleitet dich unser ausgebildetes, erfahrenes Trainerteam – mit den neuesten Trainingstechnologien und viel Herz.</p>
        ${featureList([
          { t: 'Individuelles Training', d: 'Dein Plan entsteht aus deinen Zielen, deinem Alltag und deinem Körper – nicht aus einer Vorlage.' },
          { t: 'Qualifizierte Trainer', d: 'Bei uns bist du keine Nummer. Wir begleiten dich familiär, persönlich und durchgängig.' },
          { t: 'Moderne Technologie', d: 'EGYM, milon und five®: Geräte, die sich auf dich einstellen und Fortschritt sichtbar machen.' },
          { t: 'Gesundheitsorientiert', d: 'Vom Rückentraining bis zum Aufbau nach der Reha – Training, das dir im Alltag guttut.' },
          { t: 'Für alle Generationen', d: 'Unsere Mitglieder sind zwischen 14 und 88 Jahre jung und trainieren wertschätzend miteinander.' },
        ])}
      </div>
    </div>
    <div class="intro__media">
      <div class="m1 reveal-img">${pic('betreuung-ausfallschritt', { alt: 'Trainer begleitet eine Trainierende bei einer Ausfallschritt-Übung', sizes: '(min-width: 760px) 58vw, 100vw', ratio: '4/3' })}</div>
      <div class="m2 reveal-img">${pic('members/elisabeth', { alt: 'Elisabeth, 88, trainiert mit Unterstützung ihres Trainers im ALBGYM', sizes: '(min-width: 760px) 40vw, 70vw', ratio: '4/5' })}</div>
      <div class="m3 reveal-img">${pic('members/demian', { alt: 'Demian, 14, beim Training an der Brustpresse', sizes: '(min-width: 760px) 32vw, 60vw', ratio: '1/1' })}</div>
      <p class="cap reveal">Von 14 bis 88: Im ALBGYM trainieren Generationen respektvoll nebeneinander – vom gesundheitsorientierten Einstieg bis zum ambitionierten Workout.</p>
    </div>
  </div>
</section>

<section class="sec sand tgrid-sec" aria-labelledby="training-title">
  <div class="wrap">
    <div class="tgrid__head">
      <div>${eyebrow('Trainingswelten')}<h2 class="h2 reveal-lines" id="training-title">Dein Training.<br>Deine Möglichkeiten.</h2></div>
      <p class="muted reveal">Mehr Kraft, mehr Ausdauer, einfach abnehmen oder fitter werden? Neun Wege, ein Ziel: dass du dich stärker und wohler fühlst.</p>
    </div>
    <div class="tgrid">
      ${trainings
        .map(
          (c, i) => `<a class="tcard reveal" style="--d:${(i % 3) * 0.08}s" href="${c.href}">
        ${c.tag ? `<span class="tcard__tag">${status(c.tag)}</span>` : ''}
        ${pic(c.img, { alt: c.alt, sizes: '(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw' })}
        <div class="tcard__body"><span class="tcard__n">${String(i + 1).padStart(2, '0')}</span><h3>${c.t}</h3>${icon.arrow}<p>${c.d}</p></div>
      </a>`
        )
        .join('')}
    </div>
    <div class="cta-row" style="justify-content:center;margin-top:5rem">${btn('Alle Trainingswelten', R.training, { variant: 'ghost' })}</div>
  </div>
</section>

<section class="sec health" data-health aria-labelledby="health-title">
  <div class="wrap health__grid">
    <div>
      ${eyebrow('Gesundheit & Wellness')}
      <h2 class="h2 reveal-lines" id="health-title">Gesund bleiben<br>ist ein Weg.<br><em>Kein Kurzprogramm.</em></h2>
      <p class="reveal" style="color:rgba(244,241,234,.75);max-width:34em">Rücken stärken, Gelenke entlasten, Wohlfühlgewicht finden, Regeneration fördern: Wir verbinden Training, Betreuung und bewährte Konzepte zu einem ganzheitlichen Ansatz für langfristiges Wohlbefinden.</p>
      <ul class="health__list">${health.map((h) => `<li class="hitem"><a href="${h.href}"><div><h3>${h.t}</h3></div>${icon.arrow}<p>${h.d}</p></a></li>`).join('')}</ul>
      <p class="note">Unser Training ergänzt – es ersetzt keine ärztliche Diagnose oder Therapie. Bei Beschwerden stimmen wir uns gern mit deiner Ärztin oder deinem Arzt ab.</p>
    </div>
    <div class="health__visual" aria-hidden="true"><div class="health__frame">${health.map((h, i) => pic(h.img, { alt: '', sizes: '45vw', cls: i === 0 ? 'is-active' : '' })).join('')}</div></div>
  </div>
</section>

<section class="sec" aria-labelledby="kurse-title">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>${eyebrow('Kurse & Community')}<h2 class="h2 reveal-lines" id="kurse-title">Gemeinsam<br>geht mehr.</h2></div>
      <div><p class="reveal">Von Yoga und Qi-Gong über RückenFit bis HIIT, Indoor Cycling und Kickboxen: Unser Kursprogramm ist für Mitglieder inklusive – und eine der schönsten Arten, dranzubleiben.</p><p class="reveal" style="margin-top:1.5rem"><a class="textlink" href="${R.kurse}">Zum kompletten Kursprogramm ${icon.arrow}</a></p></div>
    </div>
    ${timetable()}
  </div>
</section>

<section class="sec future" aria-labelledby="future-title">
  <div class="wrap">
    <p class="future__num" aria-hidden="true">3.0</p>
    <div class="future__head">
      <div>${eyebrow('ALBGYM 3.0 · Neubau Frühjahr 2027')}<h2 class="h2 reveal-lines" id="future-title">Die modernste<br>Fitness- &amp; Gesundheitswelt<br><em>im Südschwarzwald entsteht.</em></h2></div>
      <div><p class="reveal" style="color:var(--stone-2)">Im Obergeschoss des EDEKA-Neubaus in St. Blasien entsteht auf über 1.100 Quadratmetern das neue ALBGYM. Wenn der Bau planmäßig voranschreitet, ziehen wir im Frühjahr 2027 um. Die neue Trainingsqualität startet schon jetzt: Die EGYM-Trainingswelt erlebst du bereits seit Herbst 2026 in unserem aktuellen Studio.</p>
      <div class="cta-row">${btn('ALBGYM 3.0 entdecken', R.neubau)}</div></div>
    </div>
    <div class="future__media">
      <figure class="reveal-img">${pic('neubau-baustelle', { alt: 'Inhaber Sascha vor dem eingerüsteten EDEKA-Neubau, in dem das ALBGYM 3.0 entsteht', sizes: '(min-width: 960px) 60vw, 100vw' })}<figcaption>Baustelle EDEKA-Neubau, St. Blasien – hier entsteht das ALBGYM 3.0.</figcaption></figure>
      <figure class="side reveal-img">${pic('egym', { alt: 'EGYM-Gerät mit digitaler Trainingssteuerung', sizes: '(min-width: 960px) 35vw, 100vw' })}<figcaption>EGYM – seit Herbst 2026 im aktuellen Studio.</figcaption></figure>
    </div>
    <div class="stats">
      <div class="stat"><span class="stat__v">1.100<sup>m²+</sup></span><span class="stat__l">geplante Trainings- und Wohlfühlfläche</span></div>
      <div class="stat"><span class="stat__v">2027</span><span class="stat__l">geplanter Umzug im Frühjahr – bei planmäßigem Baufortschritt</span></div>
      <div class="stat"><span class="stat__v">EGYM</span><span class="stat__l">vernetzte Trainingswelt – bereits heute verfügbar</span></div>
      <div class="stat"><span class="stat__v">14–88</span><span class="stat__l">Jahre jung sind unsere Mitglieder</span></div>
    </div>
    <div class="phases">
      <div class="phase reveal">${status('now')}<h3>Schon heute im ALBGYM</h3><ul><li>EGYM-Trainingswelt (seit Herbst 2026)</li><li>milon-Zirkel &amp; five®-Beweglichkeit</li><li>Freihantel-, Geräte- und Cardiotraining</li><li>Kursprogramm &amp; persönliche Betreuung</li></ul></div>
      <div class="phase reveal" style="--d:.1s">${status('confirmed')}<h3>Der Neubau</h3><ul><li>Über 1.100 m² im Obergeschoss des EDEKA-Neubaus</li><li>Umzug geplant für Frühjahr 2027</li><li>Bewährte Konzepte ziehen mit um</li></ul></div>
      <div class="phase reveal" style="--d:.2s">${status('planned')}<h3>Geplant im ALBGYM 3.0</h3><ul><li>Skillcourt für Reaktion, Koordination &amp; mentale Fitness</li><li>Lichtdurchflutete Räume, Cardio mit Blick über St. Blasien</li><li>Hantel- und Functionalbereich</li><li>Gemütliche Lounge für Begegnung</li></ul></div>
    </div>
  </div>
</section>

${testimonialsBlock()}

${offerBlock()}

<section class="ig" aria-labelledby="ig-title">
  <div class="wrap ig__inner">
    <div>${eyebrow('Community')}<h2 class="sr" id="ig-title">ALBGYM auf Instagram</h2><a class="ig__handle" href="${site.instagram}" target="_blank" rel="noopener">${icon.insta}${site.instagramHandle}</a><p class="muted" style="margin-top:1rem;max-width:34em">Einblicke ins Studio, Baufortschritt des ALBGYM 3.0, Events wie der EGYM Gameday und Neuigkeiten aus der Community.</p></div>
    ${btn('Auf Instagram folgen', site.instagram, { variant: 'ghost', attrs: 'target="_blank" rel="noopener"' })}
  </div>
</section>

${finalCta()}
`;
  },
};
