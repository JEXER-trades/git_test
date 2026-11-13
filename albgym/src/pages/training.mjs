import { site } from '../data/site.mjs';
import { R, pic, btn, eyebrow, icon, featureList, offerBlock, finalCta, testimonialsBlock, status, pageHero, split, related, crumbsLd } from '../lib.mjs';

const T = { label: 'Training', href: R.training };
const probe = (l = 'Probetraining vereinbaren') => btn(l, R.probe);
const ghostCall = `<a class="btn btn--ghost-light" href="tel:${site.phoneIntl}">${icon.phone}<span>${site.phone}</span></a>`;

const steps = (items) => `<ol class="steps">${items.map((s) => `<li class="reveal"><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol>`;

export const overview = {
  path: R.training,
  title: 'Training im ALBGYM St. Blasien · Kraft, EGYM, milon, Cardio & mehr',
  description: 'Alle Trainingswelten im ALBGYM St. Blasien: Krafttraining, Freihanteln, EGYM, milon-Zirkel, Cardio, Skillcourt, Leistungssport und Personal Training.',
  image: 'kurs-langhantel',
  crumbs: [{ label: 'Training', href: R.training }],
  render() {
    const items = [
      ['Fitness & Krafttraining', R.kraft, 'geraetetraining', 'Muskeln aufbauen, Figur formen, Alltag erleichtern.'],
      ['Gerätetraining & EGYM', R.egym, 'egym', 'Vernetzte, automatisch eingestellte Trainingswelt.'],
      ['Milon-Zirkeltraining', R.milon, 'milon-five', 'Kraft und Ausdauer im geführten Zirkel.'],
      ['Cardio & Ausdauer', R.cardio, 'cardio', 'Ergometer, Stepper, Rudergeräte und Cardio-Zirkel.'],
      ['Skillcourt', R.skillcourt, 'skillcourt', 'Reaktion, Koordination, mentale Fitness – geplant für ALBGYM 3.0.'],
      ['Leistungssport & Bodybuilding', R.bodybuilding, 'bodybuilding', 'Freie Gewichte, Hantel- und Functionalbereich.'],
      ['Personal Training', R.pt, 'betreuung-ausfallschritt', 'Individuell, effektiv und langfristig begleitet.'],
      ['Jugendtraining ab 14', R.kraft + '#jugend', 'jugendtraining', 'Gesundes Muskeltraining für Jugendliche – professionell betreut.'],
    ];
    return `${pageHero({ kicker: 'Trainingswelten', title: 'Bei minimalem<br>Zeitaufwand<br><em>maximale Ziele.</em>', lead: 'Ob Arme, Beine, Rücken, Brust oder Bauch – im ALBGYM kommt jeder Muskel auf Touren. Hochmoderne Geräte, freie Gewichte und ein Trainerteam, das dir zeigt, wie du Abwechslung in dein Training bringst.', image: 'kurs-langhantel', alt: 'Gruppe trainiert Kniebeugen mit der Langhantel', ctas: [probe(), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head">${eyebrow('Acht Wege zu deinem Ziel')}<h2 class="h2 reveal-lines">Alle Trainingswelten<br><em>im Überblick.</em></h2></div>
  <div class="tgrid">${items.map(([t, h, img, d], i) => `<a class="tcard reveal" href="${h}">${i === 4 ? `<span class="tcard__tag">${status('planned')}</span>` : ''}${i === 1 ? `<span class="tcard__tag">${status('now')}</span>` : ''}${pic(img, { alt: '', sizes: '(min-width: 1024px) 50vw, 100vw' })}<div class="tcard__body"><span class="tcard__n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3>${icon.arrow}<p>${d}</p></div></a>`).join('')}</div>
</div></section>
${offerBlock()}
${finalCta()}`;
  },
};

export const kraft = {
  path: R.kraft,
  title: 'Fitness & Krafttraining in St. Blasien · ALBGYM',
  description: 'Krafttraining im ALBGYM St. Blasien: Freihanteln, moderne Geräte und individuelle Trainingspläne – plus Jugendtraining ab 14 Jahren. Probetraining vereinbaren.',
  image: 'geraetetraining',
  crumbs: [T, { label: 'Fitness & Krafttraining', href: R.kraft }],
  render() {
    return `${pageHero({ kicker: 'Fitness & Krafttraining', title: 'Mehr Kraft.<br>Für alles,<br><em>was dir wichtig ist.</em>', lead: 'Gezielter Muskelaufbau gibt dir mehr Stabilität, Energie und Leistungsfähigkeit – egal ob für Gesundheit, Figur oder mehr Power im Alltag.', image: 'geraetetraining', alt: 'Frau trainiert an einer Kraftstation im ALBGYM', ctas: [probe(), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap"><div class="intro__grid">
  <div>${eyebrow('Warum Krafttraining')}<h2 class="h2 reveal-lines">Muskeln sind<br>dein bester<br><em>Partner fürs Leben.</em></h2></div>
  <div class="intro__body" style="padding-top:0">
    <p class="lead reveal">Unsere Trainer zeigen dir gezielte Übungen, wie du Abwechslung in deinen Trainingsalltag bringst, deine Koordination schulst und gleichzeitig deine Figur in Form bringst.</p>
    ${featureList([
      { t: 'Individueller Trainingsplan', d: 'Abgestimmt auf deine Ziele, dein Niveau und deine verfügbare Zeit.' },
      { t: 'Saubere Technik', d: 'Wir zeigen dir jede Übung – und korrigieren, bis sie sitzt.' },
      { t: 'Messbarer Fortschritt', d: 'Regelmäßige Anpassung deines Plans, damit dein Körper neue Reize bekommt.' },
    ])}
  </div>
</div></div></section>
${split({ id: 'freihantel', img: 'kurzhantel', alt: 'Mann trainiert mit der Kurzhantel', kicker: 'Freihanteltraining', title: 'Frei. Ehrlich.<br><em>Wirksam.</em>', body: '<p>Durch gezieltes Krafttraining mit Kurz- und Langhanteln wird deine Muskulatur aktiv trainiert und aufgebaut. Freie Gewichte fordern Stabilität, Koordination und Körpergefühl – und sind die Grundlage für jeden, der seine Kraft wirklich entwickeln will.</p><p>Unser Hantelbereich gibt allen Raum, die richtig Gas geben wollen – mit Unterstützung, wann immer du sie brauchst.</p>', extra: `<a class="textlink" href="${R.bodybuilding}">Leistungssport & Bodybuilding ${icon.arrow}</a>` })}
${split({ reverse: true, img: 'latzug', alt: 'Trainierende am Latzug', kicker: 'Gerätetraining', title: 'Geführt, sicher,<br><em>auf dich eingestellt.</em>', body: '<p>Hochmoderne Geräte bringen dich ans Fitness-Limit und sorgen für einen spürbaren Trainingserfolg. Mit der EGYM-Trainingswelt stellen sich die Geräte automatisch auf dich ein und geben Orientierung bei Tempo und Bewegungsausführung.</p>', extra: `<a class="textlink" href="${R.egym}">Mehr zu EGYM ${icon.arrow}</a>` })}
<section class="sec sand" id="jugend"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Jugendtraining ab 14 Jahren')}<h2 class="h2 reveal-lines">Stark durch<br>die Jugend.</h2></div><p class="reveal">Als gesundheitsorientiertes Studio mit sehr guter Betreuung ist das ALBGYM der ideale Partner für Jugendtraining. Es ist uns ein echtes Anliegen, Jugendliche – und ihre Eltern – in der Phase der Pubertät zu unterstützen.</p></div>
  <div class="split__grid" style="display:grid;gap:3rem">
    <div class="reveal-img">${pic('jugendtraining', { alt: 'Jugendlicher trainiert konzentriert an einem Kraftgerät', ratio: '3/2', sizes: '(min-width: 900px) 50vw, 100vw' })}</div>
    <div>${featureList([
      { t: 'Leistungsfähiger', d: 'In Schule und Ausbildung.' },
      { t: 'Mehr Selbstbewusstsein', d: 'Fortschritt, den man sieht und spürt.' },
      { t: 'Ausgeglichener', d: 'Bewegung als Ausgleich zum Alltag.' },
      { t: 'Persönliche Stärke', d: 'Disziplin und Ziele, die man selbst erreicht.' },
    ])}<div class="cta-row">${btn('Jugendtraining anfragen', R.mitglied + '?angebot=jugend#anfrage', { variant: 'primary' })}</div></div>
  </div>
</div></section>
${testimonialsBlock({ title: 'Stark in jedem Alter.', filter: ['Demian', 'Janic & Magnus', 'Isabelle', 'Frank', 'Gisela'] })}
${offerBlock()}
${related([{ label: 'Gerätetraining & EGYM', href: R.egym, img: 'egym' }, { label: 'Personal Training', href: R.pt, img: 'betreuung-ausfallschritt' }, { label: 'Leistungssport', href: R.bodybuilding, img: 'bodybuilding' }])}
${finalCta()}`;
  },
};

export const egym = {
  path: R.egym,
  title: 'Gerätetraining & EGYM in St. Blasien · ALBGYM',
  description: 'Neu seit Herbst 2026 im ALBGYM St. Blasien: die vernetzte EGYM-Trainingswelt. Geräte stellen sich automatisch ein, messen deine Leistung und passen das Training laufend an.',
  image: 'egym',
  crumbs: [T, { label: 'Gerätetraining & EGYM', href: R.egym }],
  render() {
    return `${pageHero({ kicker: 'Neu seit Herbst 2026 · Gerätetraining & EGYM', title: 'Du siehst nicht nur,<br>dass du trainierst.<br><em>Du siehst, wie du<br>dich entwickelst.</em>', lead: 'Die vernetzte Trainingswelt von EGYM: Im Zentrum steht das Zusammenspiel aus Training, persönlicher Betreuung, Testung, Fortschrittsmessung und Motivation.', image: 'egym', alt: 'Trainierende bedient das EGYM-Display an einem Kraftgerät', ctas: [probe('EGYM jetzt testen'), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${status('now')}<h2 class="h2 reveal-lines" style="margin-top:1.5rem">Mehr als ein Gerät.<br><em>Ein System.</em></h2></div>
  <div><p class="reveal">Geräte, die das Training elektronisch unterstützen, sich automatisch auf die trainierende Person einstellen und bei Tempo und Bewegungsausführung Orientierung geben, kennen bereits viele. Der entscheidende Unterschied: EGYM denkt den Trainingsfortschritt mit.</p></div></div>
  ${steps([
    { t: 'Messen', d: 'Das System misst regelmäßig deine aktuelle Leistungsfähigkeit.' },
    { t: 'Anpassen', d: 'Dein Training wird laufend angepasst – mit neuen Reizen genau dann, wenn dein Körper sie braucht.' },
    { t: 'Erleben', d: 'Mehr Sicherheit, mehr Motivation und ein klar messbarer Fortschritt.' },
  ])}
</div></section>
${split({ id: 'geraete', img: 'latzug', alt: 'Training am Latzug', kicker: 'Gerätetraining', title: 'Sicher und kontrolliert<br><em>an deine Grenzen.</em>', body: '<p>Mit den elektronischen EGYM-Geräten trainierst du besonders sicher und kontrolliert. Ob Einstieg, Wiedereinstieg oder ambitioniertes Ziel – das Training entwickelt sich mit dir weiter, statt Woche für Woche denselben Ablauf zu wiederholen.</p><p>Unser Trainerteam richtet dein Programm gemeinsam mit dir ein und begleitet dich bei jedem Schritt.</p>' })}
<section class="qband dark"><div class="wrap"><blockquote>„Man sieht nicht nur, dass man trainiert hat – man sieht, dass man <em>stärker und fitter</em> wird.“</blockquote><cite>Das EGYM-Prinzip im ALBGYM</cite></div></section>
${split({ reverse: true, img: 'geraetetraining', alt: 'Konzentriertes Training an einer Kraftstation', kicker: 'Für alle Generationen', title: 'Vom ersten Training<br><em>bis zum nächsten Level.</em>', body: '<p>Gerade für Einsteigerinnen, Einsteiger und Menschen mit gesundheitlichen Zielen ist geführtes Training ein idealer Start. Und wer mehr will, findet im Hantel- und Functionalbereich alles, um richtig Gas zu geben.</p>', extra: `<div class="cta-row">${btn('Probetraining vereinbaren', R.probe)}</div>` })}
${related([{ label: 'Milon-Zirkeltraining', href: R.milon, img: 'milon-five' }, { label: 'ALBGYM 3.0', href: R.neubau, img: 'neubau-baustelle' }, { label: 'Fitness & Krafttraining', href: R.kraft, img: 'geraetetraining' }])}
${finalCta()}`;
  },
};

export const milon = {
  path: R.milon,
  title: 'Milon-Zirkeltraining in St. Blasien · ALBGYM',
  description: 'Milon-Kraft- und Ausdauerzirkel im ALBGYM St. Blasien: effektives, geführtes Training in kurzer Zeit – kombiniert mit five®-Beweglichkeitstraining.',
  image: 'milon-five',
  crumbs: [T, { label: 'Milon-Zirkeltraining', href: R.milon }],
  render() {
    return `${pageHero({ kicker: 'Milon-Zirkeltraining', title: 'Einsteigen.<br>Durchstarten.<br><em>Dranbleiben.</em>', lead: 'Ob milon-Ausdauer- oder milon-Kraftzirkel: Bei uns kann dein Training sofort starten – geführt, effektiv und mit wenig Zeitaufwand.', image: 'milon-five', alt: 'Trainierende im milon-Zirkel mit Trainer am five-Gerät', ctas: [probe(), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('So funktioniert der Zirkel')}<h2 class="h2 reveal-lines">Klarer Ablauf.<br><em>Spürbare Wirkung.</em></h2></div><p class="reveal">Der Zirkel führt dich in fester Reihenfolge durch abgestimmte Stationen. Die Geräte stellen sich auf dich ein, du konzentrierst dich ganz auf die Bewegung.</p></div>
  ${steps([
    { t: 'Einweisung', d: 'Wir richten den Zirkel gemeinsam ein und erklären dir jede Station.' },
    { t: 'Training', d: 'Kraft- und Ausdauerstationen im Wechsel – kompakt und effektiv.' },
    { t: 'Beweglichkeit', d: 'Ergänzend mit five®: Muskellängentraining gegen einseitige Belastungen aus Beruf und Alltag.' },
  ])}
</div></section>
${split({ img: 'betreuung-balance', alt: 'Trainierende mit Trainer beim Gleichgewichtstraining', kicker: 'Für wen?', title: 'Ideal für Einsteiger,<br><em>Vielbeschäftigte</em><br>und Gesundheitsbewusste.', body: '<p>Der Zirkel ist perfekt, wenn du wenig Zeit hast, nach einer Pause wieder einsteigen möchtest oder gezielt einseitigen Belastungen von Beruf und Alltag mit einem Kraft- und Muskellängentraining entgegenwirken willst.</p>', extra: `<a class="textlink" href="${R.ruecken}#five">Mehr zu five® ${icon.arrow}</a>` })}
${offerBlock()}
${related([{ label: 'Gesundheit & Rücken', href: R.ruecken, img: 'betreuung-balance' }, { label: 'Gerätetraining & EGYM', href: R.egym, img: 'egym' }, { label: 'Cardio & Ausdauer', href: R.cardio, img: 'cardio' }])}
${finalCta()}`;
  },
};

export const cardio = {
  path: R.cardio,
  title: 'Cardio & Ausdauertraining in St. Blasien · ALBGYM',
  description: 'Ausdauertraining im ALBGYM St. Blasien: Ergometer, Stepper, Rudergeräte und Cardio-Zirkel, dazu Indoor Cycling, HIIT und Tabata im Kursprogramm.',
  image: 'cardio',
  crumbs: [T, { label: 'Cardio & Ausdauer', href: R.cardio }],
  render() {
    return `${pageHero({ kicker: 'Cardio & Ausdauer', title: 'Mehr Puste.<br><em>Mehr Leben.</em>', lead: 'Alles, was das Cardio-Herz begehrt: Ergometer, Stepper, Rudergeräte und Cardio-Zirkel – und im Kursprogramm Indoor Cycling, HIIT und Tabata.', image: 'cardio', alt: 'Trainierende auf Laufbändern im Cardiobereich', ctas: [probe(), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('Ausdauer im ALBGYM')}<h2 class="h2 reveal-lines">Dein Tempo.<br><em>Deine Strecke.</em></h2></div><p class="reveal">Ausdauertraining stärkt Herz und Kreislauf, unterstützt dein Wohlfühlgewicht und sorgt für Energie im Alltag. Wir stellen dir ein Programm zusammen, das zu deinem Fitnessstand passt.</p></div>
  <div class="cards cards--3">
    <div class="reveal"><h3>Cardiogeräte</h3><p>Ergometer, Stepper und Rudergeräte für gelenkschonendes und intensives Training.</p></div>
    <div class="reveal" style="--d:.08s"><h3>Cardio-Zirkel</h3><p>Abwechslungsreich von Station zu Station – ideal in Kombination mit dem milon-Zirkel.</p></div>
    <div class="reveal" style="--d:.16s"><h3>Kurse</h3><p>Indoor Cycling, HIIT, Tabata und Fit-Mix – Ausdauer mit Gruppendynamik.</p><a class="textlink" href="${R.kurse}">Kursplan ${icon.arrow}</a></div>
  </div>
</div></section>
${split({ reverse: true, img: 'cardio-gemeinschaft', alt: 'Lachende Trainierende nach dem Cardiotraining', kicker: 'Ausblick ALBGYM 3.0', title: 'Cardio mit Blick<br><em>über St. Blasien.</em>', body: `<p>${status('planned')}</p><p>Im geplanten Neubau entstehen lichtdurchflutete Räume – mit einem Cardiobereich, der den Blick über die Dächer von St. Blasien freigibt.</p>`, extra: `<a class="textlink" href="${R.neubau}">ALBGYM 3.0 entdecken ${icon.arrow}</a>` })}
${related([{ label: 'Kursprogramm', href: R.kurse, img: 'kurs-gruppe' }, { label: 'Milon-Zirkel', href: R.milon, img: 'milon-five' }, { label: 'Figur & Ernährung', href: R.figur, img: 'ernaehrung' }])}
${finalCta()}`;
  },
};

export const skillcourt = {
  path: R.skillcourt,
  title: 'Skillcourt im ALBGYM 3.0 · Training für Körper und Kopf · St. Blasien',
  description: 'Geplant für das ALBGYM 3.0 in St. Blasien: der Skillcourt für Reaktion, Koordination, Konzentration und Gleichgewicht – für Sportler, Berufstätige und Ältere.',
  image: 'skillcourt',
  crumbs: [T, { label: 'Skillcourt', href: R.skillcourt }],
  render() {
    const groups = [
      { t: 'Für Sportlerinnen & Sportler', d: 'Reaktionsgeschwindigkeit, Orientierung, Entscheidungsfähigkeit und Bewegungskoordination verbessern – im Leistungs- wie im Hobbysport.' },
      { t: 'Für Berufstätige', d: 'Geistige Leistungsfähigkeit unterstützen: schneller reagieren, konzentrierter bleiben, mehrere Reize besser verarbeiten.' },
      { t: 'Für ältere Menschen', d: 'Koordination, Gleichgewicht und Reaktion trainieren – für mehr Sicherheit im Alltag und um länger selbstständig aktiv zu bleiben.' },
      { t: 'Für alle', d: 'Eine spielerische, motivierende Ergänzung zum klassischen Training – mit spürbarem Nutzen für Körper und Kopf.' },
    ];
    return `${pageHero({ kicker: 'Skillcourt · Geplant für ALBGYM 3.0', title: 'Training für<br>Körper<br><em>und Kopf.</em>', lead: 'Im neuen ALBGYM 3.0 trainierst du nicht nur Muskeln, Kraft und Ausdauer, sondern auch Reaktion, Koordination, Konzentration, Gleichgewicht und schnelles, vernetztes Denken.', image: 'skillcourt', alt: 'Person trainiert auf dem Skillcourt mit projizierten Feldern', ctas: [btn('Vormerken lassen', R.kontakt + '?betreff=Skillcourt%20im%20ALBGYM%203.0#kontakt'), btn('ALBGYM 3.0 entdecken', R.neubau, { variant: 'ghost-light' })], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <p class="note note--light" style="margin:0 0 4rem">${status('planned')}<span>Der Skillcourt ist für das neue ALBGYM 3.0 geplant (Umzug voraussichtlich Frühjahr 2027) und im aktuellen Studio noch nicht verfügbar.</span></p>
  <div class="sec-head sec-head--split"><div>${eyebrow('Warum Skills zählen')}<h2 class="h2 reveal-lines">Wach, sicher,<br><em>leistungsfähig.</em></h2></div><p class="reveal">Genau diese sogenannten Skills entscheiden oft darüber, wie sicher, leistungsfähig und wach wir uns im Alltag, im Beruf und beim Sport fühlen.</p></div>
  ${featureList(groups, 'flist--2')}
</div></section>
${offerBlock({ compact: true })}
${related([{ label: 'ALBGYM 3.0', href: R.neubau, img: 'neubau-baustelle' }, { label: 'EGYM-Trainingswelt', href: R.egym, img: 'egym' }, { label: 'Gesundheit & Rücken', href: R.ruecken, img: 'betreuung-balance' }])}
${finalCta()}`;
  },
};

export const bodybuilding = {
  path: R.bodybuilding,
  title: 'Leistungssport & Bodybuilding in St. Blasien · ALBGYM',
  description: 'Freie Gewichte, Hantel- und Functionalbereich im ALBGYM St. Blasien – für Kraftsport, Natural Bodybuilding, Calisthenics und sportliche Leistungsziele.',
  image: 'bodybuilding',
  crumbs: [T, { label: 'Leistungssport & Bodybuilding', href: R.bodybuilding }],
  render() {
    return `${pageHero({ kicker: 'Leistungssport & Bodybuilding', title: 'Earn<br>every<br><em>Rep.</em>', lead: 'Hantel- und Functionalbereich für alle, die richtig Gas geben wollen – mit Trainerinnen und Trainern, die Leistung verstehen.', image: 'bodybuilding', alt: 'Athlet beim Schulterdrücken mit Kurzhanteln am Fenster', ctas: [probe(), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap"><div class="intro__grid">
  <div>${eyebrow('Für Ambitionierte')}<h2 class="h2 reveal-lines">Ernsthaft<br>trainieren.<br><em>Familiär bleiben.</em></h2></div>
  <div class="intro__body" style="padding-top:0"><p class="lead reveal">Ob Natural Bodybuilding, Calisthenics, Kraftsport oder Athletiktraining für deinen Verein: Im ALBGYM findest du freie Gewichte, ein erfahrenes Team und eine Community, die sich gegenseitig pusht.</p>
  ${featureList([
    { t: 'Freie Gewichte', d: 'Kurz- und Langhanteln für Grundübungen und gezielte Isolation.' },
    { t: 'Functionalbereich', d: 'Raum für Athletik, Kettlebells und funktionelle Bewegungsmuster.' },
    { t: 'Trainingsplanung', d: 'Periodisierung und Plananpassung im Personal Training.' },
  ])}</div>
</div></div></section>
${split({ img: 'members/demian', alt: 'Demian trainiert an der Brustpresse', kicker: 'Aus der Community', title: '„Direkt ins<br><em>ALBGYM gekommen.“</em>', ratio: '1/1', body: '<p>„Ich interessiere mich stark für Calisthenics und Natural-Bodybuilding. Als ich dann 14 wurde und offiziell ins Fitness-Studio durfte, habe ich mich riesig gefreut – und bin direkt ins Albgym gekommen.“</p><p class="fine">Demian, 14 Jahre · Mitglied seit 6 Monaten</p>' })}
${split({ reverse: true, img: 'kettlebell', alt: 'Konzentriertes Training mit der Kettlebell', ratio: '3/2', kicker: 'Leistung mit Plan', title: 'Stärker werden<br><em>mit System.</em>', body: '<p>Leistungssport braucht mehr als Motivation: saubere Technik, durchdachte Belastungssteuerung und Regeneration. Im Personal Training entwickeln wir gemeinsam deinen Plan.</p>', extra: `<a class="textlink" href="${R.pt}">Personal Training ${icon.arrow}</a>` })}
${related([{ label: 'Fitness & Krafttraining', href: R.kraft, img: 'geraetetraining' }, { label: 'Personal Training', href: R.pt, img: 'betreuung-ausfallschritt' }, { label: 'Wellness & Regeneration', href: R.wellness, img: 'kurs-stretching' }])}
${finalCta()}`;
  },
};

export const pt = {
  path: R.pt,
  title: 'Personal Training in St. Blasien · ALBGYM',
  description: 'Personal Training im ALBGYM St. Blasien: individueller Trainingsplan, professionelle Anleitung und langfristige Begleitung – auch als Aufbauprogramm nach der Reha.',
  image: 'betreuung-ausfallschritt',
  crumbs: [T, { label: 'Personal Training', href: R.pt }],
  render() {
    return `${pageHero({ kicker: 'Personal Training', title: 'Dein Ziel.<br>Dein Plan.<br><em>Dein Team.</em>', lead: 'Du hast ein ganz persönliches Ziel und möchtest es möglichst effektiv umsetzen? Du legst Wert auf individuelle, speziell auf dich abgestimmte Betreuung? Dann ist Personal Training genau richtig.', image: 'betreuung-ausfallschritt', alt: 'Trainer unterstützt Trainierende bei einer Kraftübung', ctas: [btn('Personal Training anfragen', R.mitglied + '?angebot=pt#anfrage'), ghostCall], crumbs: this.crumbs })}
<section class="sec"><div class="wrap">
  <div class="sec-head sec-head--split"><div>${eyebrow('So arbeiten wir')}<h2 class="h2 reveal-lines">Professionell<br>angeleitet.<br><em>Langfristig begleitet.</em></h2></div><p class="reveal">Unter professioneller Anleitung erstellen wir einen auf deine Bedürfnisse abgestimmten Trainingsplan und betreuen dich langfristig bei der Umsetzung deiner Ziele. Jede Menge Motivation und Spaß inklusive.</p></div>
  ${steps([
    { t: 'Kennenlernen', d: 'Wir sprechen über deine Ziele, deine Vorgeschichte und deinen Alltag.' },
    { t: 'Analyse & Plan', d: 'Dein individueller Trainingsplan – abgestimmt auf dich und deine Möglichkeiten.' },
    { t: 'Begleitung', d: 'Regelmäßige Termine, Technik-Coaching und Anpassung des Plans.' },
  ])}
</div></section>
${split({ img: 'trainerin-plan', alt: 'Trainerin mit Trainingsplan auf dem Klemmbrett', ratio: '1/1', kicker: 'Nach der Reha', title: 'Gesundheits&shy;orientiert<br><em>wieder aufbauen.</em>', body: '<p>Du benötigst ein gesundheitsorientiertes Aufbauprogramm nach einer Reha? Wir entwickeln mit dir ein behutsames, schrittweise steigerndes Training – gern in Abstimmung mit deiner Ärztin, deinem Arzt oder deiner Physiotherapie.</p>' })}
${testimonialsBlock({ title: 'Persönlich begleitet.', filter: ['Elisabeth', 'Tino', 'Frank', 'Gisela'] })}
${related([{ label: 'Gesundheit & Rücken', href: R.ruecken, img: 'betreuung-balance' }, { label: 'Figur & Ernährung', href: R.figur, img: 'ernaehrung' }, { label: 'Leistungssport', href: R.bodybuilding, img: 'bodybuilding' }])}
${finalCta()}`;
  },
};
