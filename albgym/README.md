# ALBGYM St. Blasien – Website

Neuer Webauftritt für das **ALBGYM Fitness- und Gesundheitszentrum**, Todtmooser Str. 8, 79837 St. Blasien.
Statische, extrem schnelle Website (HTML/CSS/Vanilla-JS) mit PHP-Formular-Endpunkt – lauffähig auf jedem
deutschen Standard-Webhosting (Apache + PHP 8.1+).

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/data/site.mjs` | **Alle Fakten an einer Stelle**: Kontakt, Öffnungszeiten, Angebot, Kursplan, Testimonials, Team |
| `src/pages/*.mjs` | Seiteninhalte (Startseite, Training, Gesundheit, Kurse, Wellness, ALBGYM 3.0, Mitgliedschaft, Probetraining, Kontakt, Über uns, Rechtliches) |
| `src/lib.mjs`, `src/layout.mjs`, `src/forms.mjs` | Komponenten, Navigation, Header/Footer, SEO-Metadaten, strukturierte Daten, Formulare |
| `src/styles/main.css` | Design-System (Farben, Typografie, Komponenten, Animationen, `prefers-reduced-motion`) |
| `src/js/main.js` | Navigation, Scroll-Animationen, Kursplan, Formulare, Consent-Manager (≈ 16 KB unkomprimiert, ohne Abhängigkeiten) |
| `assets-src/photos/` | Original-Fotos (von albgym.de übernommen) |
| `public/` | Statische Dateien: `.htaccess`, `robots.txt`, Icons, `api/anfrage.php` |
| `dist/` | **Fertige Website zum Hochladen** |
| `docs/` | Übergabe-Checkliste und Foto-Shotlist |

## Seiten (22 + 404)

`/` · `/ueber-uns/` · `/training/` · `/training/fitness-krafttraining/` · `/training/geraetetraining-egym/` ·
`/training/milon-zirkeltraining/` · `/training/cardio-ausdauer/` · `/training/skillcourt/` ·
`/training/leistungssport-bodybuilding/` · `/training/personal-training/` · `/gesundheit/ruecken/` ·
`/gesundheit/figur-ernaehrung/` · `/kurse/` · `/wellness/` · `/albgym-3-0/` · `/mitgliedschaft/` ·
`/probetraining/` · `/kontakt/` · `/impressum/` · `/datenschutz/` · `/danke/` · `/anfrage-fehler/` · `404.html`

## Entwicklung

```bash
npm install
npm run images     # Fotos graden + AVIF/WebP/JPEG in 5 Größen erzeugen (nur bei neuen Fotos nötig)
npm run build      # Seiten nach dist/ rendern, sitemap.xml erzeugen
ALBGYM_MAIL_DRY=1 npm run serve   # lokal unter http://127.0.0.1:8080 (Formulare schreiben nach dist/api/storage/outbox.log)
```

Inhalte ändern: Daten in `src/data/site.mjs` bzw. Texte in `src/pages/*.mjs` anpassen, dann `npm run build`.
Neue Fotos: Datei nach `assets-src/photos/` legen, `npm run images`, im Code mit `pic('dateiname', { alt: '…' })` verwenden.

## Deployment

1. Inhalt von `dist/` per SFTP in das Web-Root von albgym.de hochladen (inkl. versteckter `.htaccess`-Dateien).
2. `dist/api/config.sample.php` → `api/config.php` kopieren, Empfänger/Absender prüfen, optional CRM-Webhook eintragen.
3. Sicherstellen, dass PHP `mail()` beim Hoster funktioniert (oder Webhook nutzen). Testanfrage über jedes Formular senden.
4. HTTPS-Zertifikat aktiv? `.htaccess` leitet auf `https://albgym.de` (ohne www) um.
5. Google Search Console: `https://albgym.de/sitemap.xml` einreichen. Google-Unternehmensprofil auf neue URLs prüfen.

## Technik & Qualität

- **Performance**: Lighthouse lokal 95–99 (Performance), 100 (Accessibility, Best Practices, SEO) auf allen Inhaltsseiten.
  AVIF/WebP mit `srcset`, Lazy Loading, Preload der zwei selbst gehosteten Variable Fonts, kein Framework.
- **Formulare**: serverseitige Validierung, Honeypot, signiertes Zeit-Token, gehashtes IP-Rate-Limit, Fallback ohne JavaScript, klare Erfolgs- und Fehlermeldungen.
- **Datenschutz**: keine externen Requests beim Seitenaufruf. Google Maps erst nach Klick (2-Klick-Lösung), Matomo optional nur mit Einwilligung (`public/js/config.js`), Schriften lokal.
- **SEO**: individuelle Titles/Descriptions, Canonicals, Open Graph, `HealthClub`/`SportsActivityLocation`-Schema mit Öffnungszeiten, Breadcrumbs, XML-Sitemap, 301-Weiterleitungen der alten URLs.
- **Barrierefreiheit**: semantisches HTML, Skip-Link, Tastaturbedienung (Menü, Dropdowns, Kursplan-Tabs), sichtbarer Fokus, AA-Kontraste, `prefers-reduced-motion`.

Vor dem Livegang bitte `docs/UEBERGABE.md` abarbeiten.
