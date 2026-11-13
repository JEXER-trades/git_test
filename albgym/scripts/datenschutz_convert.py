"""One-off converter: existing albgym.de Datenschutzerklärung (Markdown export)
-> HTML fragment adapted to the new website's actual data processing.
Usage: python3 scripts/datenschutz_convert.py <input.md> src/data/datenschutz.html"""
import sys, re, html

src = open(sys.argv[1], encoding='utf8').read().split('\n')
start = next(i for i, l in enumerate(src) if l.startswith('## 1.'))
end = next(i for i, l in enumerate(src) if l.startswith('#### SO ERREICHEN'))
lines = [l.strip() for l in src[start:end]]

DROP = {'Google Tag Manager', 'Facebook Pixel', 'YouTube mit erweitertem Datenschutz', 'Font Awesome (lokales Hosting)',
        'Betrugsprävention – Verwendung von Friendly Captcha', 'Matomo', 'IP-Anonymisierung', 'Hosting_matomo',
        'Google Web Fonts (lokales Hosting)'}
NEW = {
'Google Web Fonts (lokales Hosting)': ('Schriftarten (lokales Hosting)', [
  'Diese Website nutzt zur einheitlichen Darstellung die Schriftarten „Fraunces“ und „Inter“. Die Schriftdateien sind lokal auf unserem Server gespeichert. Eine Verbindung zu Servern Dritter (z. B. Google) findet dabei nicht statt.']),
'Matomo': ('Matomo (nur mit Einwilligung)', [
  'Diese Website kann den Open-Source-Webanalysedienst Matomo nutzen. Matomo wird ausschließlich nach Ihrer ausdrücklichen Einwilligung über unsere Cookie-Einstellungen geladen und in einem cookielosen Modus mit IP-Anonymisierung betrieben. Matomo wird auf eigenen Servern gehostet, sodass die Analysedaten nicht an Dritte weitergegeben werden.',
  'Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG). Sie können Ihre Einwilligung jederzeit über den Link „Cookie-Einstellungen“ im Fußbereich der Website mit Wirkung für die Zukunft widerrufen.']),
}
INSERT_AFTER_CONTACT = [
  ('h3', 'Anfrageformulare (Probetraining, Mitgliedschaft, Kontakt)', 'formulare'),
  ('p', 'Wenn Sie eines unserer Formulare nutzen, verarbeiten wir die von Ihnen eingegebenen Angaben (insbesondere Name, E-Mail-Adresse, Telefonnummer, Wunschtermin, Interessen und Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme mit Ihnen. Die Übermittlung erfolgt verschlüsselt per TLS; die Anfrage wird anschließend per E-Mail an unser Team weitergeleitet. Zum Schutz vor Missbrauch verwenden wir ein unsichtbares Prüffeld und eine Zeitprüfung – ohne Einbindung externer Captcha-Dienste. Zur Abwehr automatisierter Massenanfragen wird ein gekürzter, nicht rückführbarer Hashwert Ihrer IP-Adresse für höchstens eine Stunde gespeichert.'),
  ('p', 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie im Formular erteilen und jederzeit widerrufen können.'),
  ('h3', 'Speicherung Ihrer Einstellungen im Browser', None),
  ('p', 'Ihre Auswahl in den Cookie-Einstellungen speichern wir im lokalen Speicher Ihres Browsers (Local Storage), damit wir Sie nicht bei jedem Besuch erneut fragen müssen. Diese Speicherung ist technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können sie jederzeit über die Browsereinstellungen löschen.'),
]
MAPS_PREFIX = 'Die Karte wird erst geladen, wenn Sie auf „Karte laden“ klicken oder dem Laden externer Medien in den Cookie-Einstellungen zugestimmt haben. Vorher werden keine Daten an Google übertragen.'

out, skip, sec = [], False, ''
def emit(tag, text, id_=None):
    t = html.escape(text, quote=False)
    t = re.sub(r'(https?://[^\s<]+[^\s<.,;)])', r'<a href="\1" rel="noopener" target="_blank">\1</a>', t)
    out.append(f'<{tag}{f" id=\"{id_}\"" if id_ else ""}>{t}</{tag}>')

in_list = False
for i, l in enumerate(lines):
    if not l:
        continue
    if l.startswith('## '):
        if in_list: out.append('</ul>'); in_list = False
        skip = False; sec = l[3:].strip()
        emit('h2', sec.replace('­', ''))
        continue
    is_head = len(l) < 75 and not l.endswith(('.', ':')) and not (l.endswith(')') and len(l) > 60) and not l.startswith('- ') and not re.match(r'^\d+\. ', l) or l in DROP
    if sec.startswith('7.') and l == 'Hosting':
        skip = True; continue
    if is_head and not l.startswith('Sascha') and not l.startswith('Tel.'):
        if in_list: out.append('</ul>'); in_list = False
        skip = l in DROP
        if l in NEW:
            title, ps = NEW[l]; emit('h3', title)
            for p in ps: emit('p', p)
            skip = True
            continue
        if skip: continue
        hid = 'google-maps' if l == 'Google Maps' else None
        emit('h3', l, hid)
        if l == 'Google Maps': emit('p', MAPS_PREFIX)
        continue
    if skip: continue
    if l.startswith('- '):
        if not in_list: out.append('<ul>'); in_list = True
        emit('li', l[2:]); continue
    if in_list: out.append('</ul>'); in_list = False
    emit('p', l)
    if l.startswith('Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben'):
        for tag, text, *rest in INSERT_AFTER_CONTACT: emit(tag, text, rest[0] if rest else None)
if in_list: out.append('</ul>')
# Section 7 is now only Matomo; rename heading
res = '\n'.join(out).replace('<h2>7. Analyse-Tools und Werbung</h2>', '<h2>7. Analyse-Tools</h2>')
open(sys.argv[2], 'w', encoding='utf8').write(res)
print(len(out), 'blocks')
