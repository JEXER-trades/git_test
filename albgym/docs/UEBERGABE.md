# Übergabe & Freigabe-Checkliste vor dem Livegang

Alle Inhalte stammen von der bestehenden albgym.de (Stand: 13.11.2026). Es wurden **keine** Bewertungen, Namen,
Statistiken oder Rechtsangaben erfunden. Die folgenden Punkte muss ALBGYM vor der Veröffentlichung bestätigen.

## 1. Inhalte bestätigen

| # | Punkt | Wo | Status |
| --- | --- | --- | --- |
| 1 | **Angebotspreis**: Die Quelle zeigt „4 Wochen-Schnupper Abo – 69,00 € /mtl.“. Laufzeit, Preisangabe (einmalig oder monatlich) und Bedingungen bestätigen. | `src/data/site.mjs` → `offer` | ☐ |
| 2 | **Kursplan** (Stand KW 43/2026) aktuell? | `site.mjs` → `schedule` | ☐ |
| 3 | **Öffnungszeiten** (Mo/Mi/Fr 8–21:30, Di/Do 9–12 & 16–21:30, Sa 13–17, So 9–14) | `site.mjs` → `hours` | ☐ |
| 4 | **PelviPower** und **Avacura Wärme & Kälte** – laut Briefing Teil des Angebots, auf der alten Website aber nicht beschrieben. Verfügbarkeit bestätigen oder Abschnitte entfernen. | `/wellness/`, Startseite Gesundheit | ☐ |
| 5 | **ALBGYM 3.0**: „über 1.100 m²“, „Obergeschoss EDEKA-Neubau“, „Frühjahr 2027“, Skillcourt/Lounge/Cardio-Ausblick als *geplant* markiert. Planungsstand bestätigen. | `/albgym-3-0/` | ☐ |
| 6 | **EGYM seit Herbst 2026** im aktuellen Studio verfügbar (als „Heute verfügbar“ markiert). | `/training/geraetetraining-egym/` | ☐ |
| 7 | **Ernährungsprogramme** myline und metabolic balance® weiterhin im Angebot? | `/gesundheit/figur-ernaehrung/` | ☐ |
| 8 | Team-Namen (Sascha, Leonis, Aline, Monika, Tobias, Sandra, Carla, Lukas, Toni, Sammy) aktuell? Rollen ergänzen, wenn gewünscht. | `site.mjs` → `team` | ☐ |

## 2. Einwilligungen & Bildrechte

| # | Punkt | Status |
| --- | --- | --- |
| 9 | **Testimonials**: Schriftliche Einwilligung aller Mitglieder (Isabelle, Frank, Elisabeth, Demian, Tino, Gisela, Janic & Magnus, Nadja) für Name, Alter, Foto und Zitat – bei Minderjährigen (Demian, Janic, Magnus) **durch die Erziehungsberechtigten**. | ☐ |
| 10 | **Gesundheitsaussagen** in Testimonials (Tino: „schmerzfrei ohne Medikamente“, Gisela: „Altersdiabetes ohne Medikamente im Griff“) rechtlich prüfen lassen (Heilmittelwerbegesetz/UWG). Ein Hinweis „Ergebnisse können abweichen; ersetzt keine ärztliche Behandlung“ ist bereits eingebaut. Ggf. Zitate kürzen. | ☐ |
| 11 | **Bildlizenzen**: Viele großformatige Motive stammen aus dem Bildbestand der bisherigen Website-Plattform (ACISO) bzw. von Herstellern (milon/five, EGYM, Skillcourt). Nutzungsrecht außerhalb der ACISO-Plattform klären – oder durch eigene Fotos ersetzen (siehe `FOTO-SHOTLIST.md`). | ☐ |
| 12 | Teamfotos: Einwilligung der Mitarbeitenden. | ☐ |

## 3. Rechtliches

| # | Punkt | Status |
| --- | --- | --- |
| 13 | **Impressum** 1:1 von albgym.de übernommen (Sascha Bernhardt, USt-IdNr. DE 295894925). Bitte prüfen. | ☐ |
| 14 | **Datenschutzerklärung**: basiert auf der bisherigen Erklärung, angepasst an die neue Website (lokale Schriften, 2-Klick-Karte, Formulare ohne Captcha-Dienst, Matomo nur mit Einwilligung; entfernt: Google Tag Manager, Facebook Pixel, YouTube, Friendly Captcha, Font Awesome). **Abschnitt „2. Hosting“ (ACISO/AWS) muss an den tatsächlichen neuen Hoster angepasst werden.** Abschnitte HighLevel, WhatsApp, Newsletter, Shop, Videokonferenzen bleiben, solange diese Dienste genutzt werden. Juristische Prüfung empfohlen. | ☐ |
| 15 | Auftragsverarbeitungsvertrag (AVV) mit dem neuen Hoster abschließen. | ☐ |

## 4. Integrationen

| # | Punkt | Status |
| --- | --- | --- |
| 16 | **Online-Mitgliedschaft**: Die Buttons „Online abschließen“ verlinken auf den bestehenden ACISO-Shop `https://albgym.de/online-mitgliedschaft`. Wenn die neue Website die ACISO-Seite ersetzt, die Shop-URL bei ACISO erfragen (z. B. Subdomain) und in `site.mjs` → `membershipShop` eintragen. | ☐ |
| 17 | **CRM**: Laut Datenschutzerklärung wird GoHighLevel genutzt. Für automatische Übernahme der Anfragen den Inbound-Webhook in `api/config.php` → `webhook_url` eintragen. | ☐ |
| 18 | **Matomo** (optional): Instanz-URL und Site-ID in `js/config.js` eintragen – Banner und Opt-in erscheinen dann automatisch. | ☐ |
| 19 | **Instagram**: Profil `@albgym_stblasien` ist verlinkt. Ein Live-Feed bräuchte ein Meta-API-Token und eine Einwilligungslösung; bewusst nicht eingebaut (Datenschutz & Performance). | ☐ |
| 20 | **Adresse nach Umzug 2027**: `site.mjs` (Adresse, Geo-Koordinaten, Maps-Links) aktualisieren, Hinweis auf `/kontakt/` entfernen. | ☐ |

## 5. Getestet (lokal)

- Alle 23 Seiten bei 320 px, iPhone 13, Pixel 7, iPad, 1440 px und 1920 px: kein horizontales Überlaufen, keine JS-Fehler.
- 2.289 interne Links, Anker und Bildquellen: 0 defekt. JSON-LD valide.
- Formulare: Pflichtfeld-, E-Mail- und Einwilligungsprüfung, Versand, Honeypot, Token-Prüfung, Fallback ohne JS (303 → `/danke/`), Vorbelegung über `?angebot=`, `?ziel=`, `?betreff=`.
- 2-Klick-Karte, mobiles Menü (inkl. Escape), Dropdowns per Tastatur, Kursplan-Tabs und -Filter.
- Lighthouse (lokaler Server): Performance 95–99, Accessibility/Best Practices/SEO 100. Echte Werte hängen vom Hosting ab.
- **Noch offen**: echter Mailversand auf dem Zielserver, Test in Safari/iOS-Geräten und Firefox (lokal nur Chromium getestet).
