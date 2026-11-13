// Central site data — every fact here is taken from the existing albgym.de
// (Stand: November 2026). Items marked VERIFY are listed in docs/UEBERGABE.md.
export const site = {
  name: 'ALBGYM',
  legalName: 'Fitness- und Gesundheitszentrum ALBGYM Sascha Bernhardt',
  longName: 'ALBGYM Fitness- und Gesundheitszentrum St. Blasien',
  url: 'https://albgym.de',
  phone: '07672 1001',
  phoneIntl: '+4976721001',
  phoneDisplayIntl: '+49 7672 1001',
  email: 'info@albgym.de',
  street: 'Todtmooser Str. 8',
  zip: '79837',
  city: 'St. Blasien',
  region: 'Südschwarzwald',
  geo: { lat: 47.7616139, lng: 8.1237167 },
  instagram: 'https://www.instagram.com/albgym_stblasien/',
  instagramHandle: '@albgym_stblasien',
  facebook: 'https://www.facebook.com/albgym.st.blasien/',
  // Existing online membership shop of the current platform (ACISO). VERIFY after go-live.
  membershipShop: 'https://albgym.de/online-mitgliedschaft',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=ALBGYM+Fitness-+und+Gesundheitszentrum,+Todtmooser+Str.+8,+79837+St.+Blasien',
  mapsEmbed:
    'https://www.google.com/maps?q=ALBGYM,+Todtmooser+Str.+8,+79837+St.+Blasien&z=16&output=embed',
};

// Opening hours (albgym.de/uber-uns). day: 1 = Montag … 7 = Sonntag
export const hours = [
  { days: 'Mo · Mi · Fr', label: 'Montag, Mittwoch, Freitag', slots: [['08:00', '21:30']], dow: [1, 3, 5] },
  { days: 'Di · Do', label: 'Dienstag, Donnerstag', slots: [['09:00', '12:00'], ['16:00', '21:30']], dow: [2, 4] },
  { days: 'Sa', label: 'Samstag', slots: [['13:00', '17:00']], dow: [6] },
  { days: 'So', label: 'Sonntag', slots: [['09:00', '14:00']], dow: [7] },
];

export const offer = {
  title: '4 Wochen ALBGYM erleben',
  product: '4-Wochen-Schnupper-Abo',
  price: '69',
  unit: '€ / mtl.',
  // VERIFY: Laufzeit-/Preisangabe mit ALBGYM abstimmen (Quelle zeigt „69,00 € /mtl.“).
  benefits: [
    'Flexibel und unabhängig – ideal zum Kennenlernen',
    'Startpaket geschenkt',
    'Individueller Trainingsplan',
    'Persönliche Betreuung durch unser Trainerteam',
    'Teilnahme am kompletten Kursangebot',
  ],
  note: 'Es gelten die aktuellen Angebotsbedingungen. Wir beraten dich gern persönlich.',
};

// Course plan as published on albgym.de/kursplan (KW 43/2026). VERIFY regularly.
export const courseCategories = {
  ruecken: 'Rücken & Gesundheit',
  balance: 'Körper & Balance',
  power: 'Kraft & Ausdauer',
  kampf: 'Kampfsport',
  reha: 'Rehasport',
};
export const courses = {
  'Rehasport': { cat: 'reha', note: 'nur mit ärztlicher Verordnung', desc: 'Ärztlich verordneter Rehabilitationssport in kleinen Gruppen – Teilnahme nur mit Rezept.' },
  'Qi-Gong': { cat: 'balance', desc: 'Ruhige, fließende Bewegungen, Atmung und Konzentration.' },
  'Yoga': { cat: 'balance', desc: 'Kraft, Beweglichkeit und Entspannung – für Einsteiger und Geübte.' },
  'Pilates': { cat: 'balance', desc: 'Kontrollierte Bewegungen für eine starke Körpermitte und gute Haltung.' },
  'RückenFit': { cat: 'ruecken', desc: 'Gezielte Kräftigung und Mobilisation für einen belastbaren Rücken.' },
  'Bauch Beine Po': { cat: 'power', desc: 'Der Klassiker für Beine, Gesäß und Rumpf.' },
  'Fit-Mix': { cat: 'power', desc: 'Abwechslungsreiches Ganzkörpertraining aus Kraft, Ausdauer und Koordination.' },
  'Funktionaltraining': { cat: 'power', desc: 'Alltagsnahe Bewegungsmuster mit und ohne Kleingeräte.' },
  'HIIT': { cat: 'power', desc: 'Hochintensives Intervalltraining – kurz, fordernd, effektiv.' },
  'Tabata': { cat: 'power', desc: 'Intervalle im 20/10-Rhythmus für maximale Energie.' },
  'Indoor Cycling': { cat: 'power', desc: 'Ausdauertraining auf dem Bike – mit Musik und Gruppendynamik.' },
  'Kickboxen': { cat: 'kampf', desc: 'Technik, Kondition und Selbstbewusstsein.' },
};
export const schedule = [
  { day: 'Montag', short: 'Mo', items: [['09:00', '10:00', 'Rehasport'], ['10:00', '11:00', 'Rehasport'], ['11:00', '12:00', 'Rehasport'], ['17:00', '17:45', 'RückenFit'], ['18:00', '18:45', 'Yoga'], ['19:00', '19:45', 'Funktionaltraining']] },
  { day: 'Dienstag', short: 'Di', items: [['09:15', '10:15', 'Qi-Gong'], ['10:30', '11:30', 'Rehasport'], ['17:30', '18:30', 'Rehasport'], ['18:30', '19:30', 'Rehasport'], ['19:30', '21:15', 'Kickboxen']] },
  { day: 'Mittwoch', short: 'Mi', items: [['10:00', '10:45', 'Bauch Beine Po'], ['17:00', '17:45', 'Yoga'], ['18:30', '19:15', 'Fit-Mix'], ['19:30', '20:15', 'Tabata']] },
  { day: 'Donnerstag', short: 'Do', items: [['09:15', '10:00', 'Yoga'], ['10:15', '11:00', 'RückenFit'], ['17:30', '18:30', 'Rehasport'], ['18:30', '19:30', 'Rehasport'], ['19:30', '20:30', 'Indoor Cycling'], ['20:30', '21:15', 'Kickboxen']] },
  { day: 'Freitag', short: 'Fr', items: [['09:00', '09:45', 'Pilates'], ['10:00', '11:00', 'Rehasport'], ['11:00', '12:00', 'Rehasport'], ['17:00', '18:00', 'Rehasport'], ['18:00', '18:45', 'HIIT'], ['19:15', '21:15', 'Kickboxen']] },
  { day: 'Samstag', short: 'Sa', items: [] },
  { day: 'Sonntag', short: 'So', items: [] },
];

// Member testimonials exactly as published on albgym.de. VERIFY: Freigabe der Mitglieder für Name, Foto & Zitat.
export const testimonials = [
  { name: 'Isabelle', age: '52 Jahre', since: 'Mitglied seit 2 Jahren', img: 'members/isabelle', alt: 'Isabelle beim Training an der Hip-Press im ALBGYM', quote: 'Das tägliche Training ist mittlerweile ein Highlight für mich geworden: Ich freue mich hierher zu kommen, denn es herrscht eine großartige, familiäre Atmosphäre.' },
  { name: 'Frank', age: null, since: 'Mitglied seit 9 Monaten', img: 'members/frank', alt: 'Frank am Latzug im ALBGYM', quote: 'Ich habe hier das Abnehmprogramm myline kennengelernt, habe meine Ernährung umgestellt und konsequent Muskeltraining gemacht. Seither habe ich 23 kg abgenommen – ich habe mich nie besser gefühlt!' },
  { name: 'Elisabeth', age: '88 Jahre', since: 'Mitglied seit 1 Jahr', img: 'members/elisabeth', alt: 'Elisabeth trainiert mit Trainerunterstützung am Rückenstrecker', quote: 'Ich hatte vor ein paar Monaten eine Rücken-Operation und bin nach der Reha hier ins Albgym gekommen, um meinen Rücken wieder aufzubauen. Das Training ist zwar anstrengend, tut mir aber sehr gut.' },
  { name: 'Demian', age: '14 Jahre', since: 'Mitglied seit 6 Monaten', img: 'members/demian', alt: 'Demian an der Brustpresse im ALBGYM', quote: 'Ich interessiere mich stark für Calisthenics und Natural-Bodybuilding. Als ich dann 14 wurde und offiziell ins Fitness-Studio durfte, habe ich mich riesig gefreut – und bin direkt ins Albgym gekommen.' },
  { name: 'Tino', age: '42 Jahre', since: 'Mitglied seit 6 Jahren', img: 'members/tino', alt: 'Tino an der Schulterpresse im ALBGYM', quote: 'Ein Bandscheibenvorfall kann einem ganz schön zusetzen! Seither bin ich hier. Komplett schmerzfrei und ohne Medikamente. Ich kann das Albgym nur jedem Schmerzgeplagten weiterempfehlen.' },
  { name: 'Gisela', age: '68 Jahre', since: 'Mitglied seit 10 Jahren', img: 'members/gisela', alt: 'Gisela beim Rudertraining im ALBGYM', quote: 'Ich habe gelernt, dass ich durch konsequentes Muskeltraining viel beeinflussen kann – ich bin nahezu schmerzfrei am Rücken – und das vor 2 Jahren diagnostizierte Altersdiabetes habe ich, ganz ohne Medikamente, im Griff.' },
  { name: 'Janic & Magnus', age: '14 & 15 Jahre', since: 'Mitglieder seit ein paar Monaten', img: 'members/janic-magnus', alt: 'Janic und Magnus beim gemeinsamen Bizepstraining', quote: 'Janic und ich trainieren regelmäßig zusammen, so motivieren wir uns gegenseitig. Ich möchte für die Feuerwehr mehr Kraft aufbauen und Janic tut das Training gut und er schläft besser und ist ruhiger im Alltag.' },
  { name: 'Nadja', age: null, since: 'Mitglied seit 5 Jahren', img: 'members/nadja', alt: 'Nadja, Kursteilnehmerin im ALBGYM', quote: 'Ich besuche verschiedene Kurse, trainiere auch im Fitnessbereich und bin hochbegeistert hier zu sein – ich kann das Albgym jedem weiterempfehlen.' },
];

// Team (albgym.de/uber-uns) — names only, roles not published.
export const team = ['Sascha', 'Leonis', 'Aline', 'Monika', 'Tobias', 'Sandra', 'Carla', 'Lukas', 'Toni', 'Sammy'];
