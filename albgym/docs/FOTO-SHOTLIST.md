# Foto-Shotlist für ALBGYM

Die Website nutzt derzeit Fotos der bisherigen albgym.de. Echte ALBGYM-Motive (Mitglieder-Testimonials, Team,
Baustelle) sind vorhanden; viele Großformate sind jedoch generische Bildmotive. Für einen authentischen
Premium-Auftritt empfehlen wir **ein professionelles Shooting (1–2 Tage)** im aktuellen Studio und – nach der
Eröffnung – im ALBGYM 3.0.

## Bildsprache

- **Licht**: natürlich, warm, gerichtet (Fensterlicht, Spots). Keine flache Studiobeleuchtung, kein Blitz.
- **Farbe**: entsättigt-warm, tiefe Schwarztöne, keine Neonfarben. Kleidung in Schwarz, Grau, Sand, Off-White.
- **Haltung**: echte Konzentration statt Stock-Lächeln. Menschen aller Generationen (14–88).
- **Formate**: jeweils quer (3:2, mind. 4.000 px) **und** hoch (4:5) fotografieren. RAW + Colorgrading.

## Shotlist (Priorität A = ersetzt aktuelles Hauptmotiv)

| Prio | Motiv | Einsatz | ersetzt aktuell |
| --- | --- | --- | --- |
| A | Hero: Mitglied 60+ beim kraftvollen Training, Gegenlicht, Trainer unscharf im Hintergrund (quer, viel Raum links für Text) | Startseite Hero | `hero-kraft-generationen` |
| A | Optional Hero-Video: 10–15 s Loop, langsame Kamerafahrt durchs Studio (ohne Ton, < 3 MB) | Startseite Hero | – |
| A | Trainer:in korrigiert eine Übung, Blickkontakt, Hände führen | Intro, Personal Training | `betreuung-ausfallschritt` |
| A | EGYM-Zirkel im ALBGYM mit Mitglied am Display | EGYM, ALBGYM 3.0 | `egym` |
| A | milon-Zirkel & five-Geräte im eigenen Studio | Milon, Rücken | `milon-five` |
| A | Hantelbereich: Langhantel-Kniebeuge, Kreide, Detail Hände/Stange | Kraft, Leistungssport | `kurzhantel`, `bodybuilding` |
| A | Kursszene (Yoga, RückenFit, Kickboxen) mit echten Teilnehmer:innen | Kurse | `kurs-gruppe`, `kurs-stretching` |
| B | Cardio-Bereich mit Mitglied, ruhige Stimmung | Cardio | `cardio` |
| B | Rückentraining / Rückenschule Muskeltest | Gesundheit & Rücken | `betreuung-balance` |
| B | Ernährungsberatung im Gespräch (Tisch, Unterlagen, natürliche Lebensmittel) | Figur & Ernährung | `ernaehrung` |
| B | Jugendliche (mit Einwilligung der Eltern) beim betreuten Training | Jugendtraining | `jugendtraining` |
| B | Community: Lachen nach dem Training, Theke/Lounge | Über uns, Abschluss-CTA | `gemeinschaft-lachen`, `highfive-hanteln` |
| B | Team-Porträts einheitlich: gleicher Hintergrund, gleiches Licht, Brustbild 4:5 | Über uns | Team-Fotos (300 px) |
| B | Testimonials neu fotografieren in hoher Auflösung (aktuell 500 px) | Social Proof | `members/*` |
| C | Baustelle / Rohbau ALBGYM 3.0: Weitwinkel, goldene Stunde; später Architektur-Visualisierungen | ALBGYM 3.0 | `neubau-baustelle` |
| C | Skillcourt im Einsatz (nach Installation) | Skillcourt | `skillcourt` |
| C | Details: Kreide, Hantelscheiben, Handtuch, Wasserflasche mit Logo, Merch „Earn every Rep“ | Akzente, Social Media | – |
| C | Außenansicht & Umgebung St. Blasien / Dom / Schwarzwald | Über uns, Kontakt | – |

Neue Fotos einfach nach `assets-src/photos/` mit demselben Dateinamen legen und `npm run build:all` ausführen –
Colorgrading, Formate und Größen werden automatisch erzeugt.
