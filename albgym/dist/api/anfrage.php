<?php
/**
 * ALBGYM – Anfrage-Endpunkt (Probetraining, Mitgliedschaft, Kontakt)
 *
 * - Serverseitige Validierung
 * - Spamschutz: Honeypot + signiertes Zeit-Token + IP-Rate-Limit (gehasht, 1 h)
 * - Versand per mail() an das Studio, optional Weiterleitung an einen
 *   CRM-Webhook (z. B. bestehendes HighLevel/LeadConnector-Inbound-Webhook)
 * - Antwort als JSON (fetch) oder Redirect auf /danke/ bzw. /anfrage-fehler/ (ohne JS)
 *
 * Konfiguration: api/config.php (siehe config.sample.php). Ohne config.php
 * gelten sichere Standardwerte.
 */
declare(strict_types=1);

$cfg = [
    'to'          => 'info@albgym.de',
    'from'        => 'website@albgym.de',
    'webhook_url' => '',          // optional: CRM-Inbound-Webhook (HTTPS)
    'min_seconds' => 2,           // Mindestzeit zwischen Seitenaufruf und Absenden
    'max_age'     => 7200,        // Token-Gültigkeit in Sekunden
    'rate_limit'  => 6,           // max. Anfragen pro IP-Hash und Stunde
    'dry_run'     => getenv('ALBGYM_MAIL_DRY') === '1', // lokal testen ohne Mailversand
];
if (is_file(__DIR__ . '/config.php')) {
    $cfg = array_merge($cfg, (array) require __DIR__ . '/config.php');
}

$storage = __DIR__ . '/storage';
if (!is_dir($storage)) { @mkdir($storage, 0700, true); }

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/* ---------- Secret (auto-generated on first run, never web-readable) ---------- */
function secret(string $storage): string {
    $f = $storage . '/.secret';
    if (!is_file($f)) { file_put_contents($f, bin2hex(random_bytes(32)), LOCK_EX); @chmod($f, 0600); }
    return trim((string) file_get_contents($f));
}
function token(string $secret): string {
    $t = (string) time();
    return $t . '.' . hash_hmac('sha256', $t, $secret);
}
$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
function respond(bool $ok, array $data, bool $json, int $code = 200): never {
    if ($json) {
        http_response_code($ok ? 200 : $code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok] + $data, JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . ($ok ? '/danke/' : '/anfrage-fehler/'), true, 303);
    }
    exit;
}

/* ---------- Token endpoint ---------- */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['token'])) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['token' => token(secret($storage))]);
        exit;
    }
    http_response_code(405);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

/* ---------- Helpers ---------- */
$in = static function (string $k, int $max = 500): string {
    $v = $_POST[$k] ?? '';
    if (is_array($v)) { return ''; }
    $v = trim(str_replace(["\r", "\0"], '', (string) $v));
    return mb_substr($v, 0, $max);
};
$oneLine = static fn(string $s): string => preg_replace('/[\n\t]+/', ' ', $s);

$form = $in('form', 30);
$forms = ['probetraining' => 'Probetraining', 'mitgliedschaft' => 'Mitgliedschaft', 'kontakt' => 'Kontakt'];
if (!isset($forms[$form])) { respond(false, ['message' => 'Unbekanntes Formular.'], $wantsJson, 400); }

/* ---------- Spam protection ---------- */
$silentOk = static function () use ($wantsJson) { respond(true, ['message' => 'Deine Anfrage ist bei uns eingegangen.'], $wantsJson); };
if ($in('firma') !== '') { $silentOk(); } // honeypot filled → bot

$tok = $in('ts', 200);
$hasToken = false;
if ($tok !== '' && preg_match('/^(\d{9,11})\.([a-f0-9]{64})$/', $tok, $m)) {
    if (!hash_equals(hash_hmac('sha256', $m[1], secret($storage)), $m[2])) { $silentOk(); }
    $age = time() - (int) $m[1];
    // Too fast for a human: ask to retry instead of silently dropping (autofill users stay safe)
    if ($age < $cfg['min_seconds']) { respond(false, ['message' => 'Das ging sehr schnell – bitte sende das Formular in einem Moment erneut.'], $wantsJson, 429); }
    if ($age > $cfg['max_age']) { respond(false, ['message' => 'Die Sitzung ist abgelaufen. Bitte lade die Seite neu und sende das Formular erneut.'], $wantsJson, 400); }
    $hasToken = true;
}

// Rate limit per salted, truncated IP hash (no raw IP stored)
$ipHash = substr(hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? '', secret($storage)), 0, 16);
$rlFile = $storage . '/rl.json';
$now = time();
$rl = is_file($rlFile) ? (json_decode((string) file_get_contents($rlFile), true) ?: []) : [];
foreach ($rl as $h => $times) { $rl[$h] = array_values(array_filter($times, fn($t) => $t > $now - 3600)); if (!$rl[$h]) unset($rl[$h]); }
if (count($rl[$ipHash] ?? []) >= $cfg['rate_limit']) {
    respond(false, ['message' => 'Zu viele Anfragen in kurzer Zeit. Bitte ruf uns gern direkt an: 07672 1001.'], $wantsJson, 429);
}

/* ---------- Validation ---------- */
$errors = [];
$name    = $oneLine($in('name', 120));
$email   = $oneLine($in('email', 160));
$phone   = $oneLine($in('phone', 40));
$msg     = $in('nachricht', 3000);
$consent = $in('consent', 2) === '1';

if (mb_strlen($name) < 2) { $errors['name'] = 'Bitte gib deinen Namen an.'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors['email'] = 'Bitte gib eine gültige E-Mail-Adresse ein.'; }
$phoneRequired = $form !== 'kontakt';
if (($phoneRequired || $phone !== '') && !preg_match('/^[+()\d\s\/-]{6,40}$/', $phone)) { $errors['phone'] = 'Bitte gib eine gültige Telefonnummer ein.'; }
if (!$consent) { $errors['consent'] = 'Bitte bestätige die Einwilligung.'; }

$fields = ['Formular' => $forms[$form], 'Name' => $name, 'E-Mail' => $email, 'Telefon' => $phone ?: '–'];
if ($form === 'probetraining') {
    $date = $in('wunschtag', 10);
    if ($date !== '' && (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || strtotime($date) < strtotime('today'))) { $errors['wunschtag'] = 'Bitte wähle ein gültiges Datum.'; }
    $allowedTimes = ['', 'Vormittag', 'Nachmittag', 'Abend'];
    $time = in_array($in('tageszeit', 20), $allowedTimes, true) ? $in('tageszeit', 20) : '';
    $interests = array_slice(array_map(fn($v) => mb_substr(trim((string) $v), 0, 60), array_filter((array) ($_POST['interessen'] ?? []), 'is_string')), 0, 10);
    $fields += ['Wunschtag' => $date ? date('d.m.Y', strtotime($date)) : 'flexibel', 'Tageszeit' => $time ?: 'egal', 'Interessen' => $interests ? implode(', ', $interests) : '–'];
}
if ($form === 'mitgliedschaft') {
    $offers = ['4-Wochen-Schnupper-Abo', 'Mitgliedschaft – Beratung', 'Personal Training', 'Jugendtraining', 'Gesundheit & Rücken', 'Figur & Ernährung'];
    $offer = $in('angebot', 60);
    if (!in_array($offer, $offers, true)) { $errors['angebot'] = 'Bitte wähle eine Option.'; }
    $way = in_array($in('kontaktweg', 20), ['Telefon', 'E-Mail', 'WhatsApp'], true) ? $in('kontaktweg', 20) : 'Telefon';
    $fields += ['Interesse' => $offer, 'Kontaktweg' => $way];
}
if ($form === 'kontakt') {
    $subject = $oneLine($in('betreff', 140));
    if (mb_strlen($subject) < 2) { $errors['betreff'] = 'Bitte gib einen Betreff an.'; }
    if (mb_strlen($msg) < 5) { $errors['nachricht'] = 'Bitte schreib uns eine kurze Nachricht.'; }
    $fields += ['Betreff' => $subject];
}
// Content heuristics (esp. for requests without JS token)
$linkCount = preg_match_all('~https?://~i', $msg);
if ($linkCount > ($hasToken ? 3 : 1)) { $silentOk(); }

if ($errors) {
    respond(false, ['message' => 'Bitte prüfe die markierten Felder.', 'errors' => $errors], $wantsJson, 422);
}

$fields['Nachricht'] = $msg ?: '–';
$fields['Seite'] = $oneLine($in('page', 120));
$fields['Eingang'] = date('d.m.Y H:i');
$fields['Einwilligung'] = 'Datenschutzhinweise akzeptiert';

/* ---------- Deliver ---------- */
$body = "Neue Anfrage über albgym.de\n" . str_repeat('=', 32) . "\n\n";
foreach ($fields as $k => $v) { $body .= str_pad($k . ':', 14) . $v . "\n"; }
$subjectLine = '=?UTF-8?B?' . base64_encode('[Website] ' . $forms[$form] . ' – ' . $name) . '?=';
$headers = [
    'From: ALBGYM Website <' . $cfg['from'] . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = false;
if ($cfg['dry_run']) {
    file_put_contents($storage . '/outbox.log', $body . "\n\n", FILE_APPEND | LOCK_EX);
    $sent = true;
} else {
    $sent = @mail($cfg['to'], $subjectLine, $body, implode("\r\n", $headers), '-f' . $cfg['from']);
}

if ($cfg['webhook_url'] && str_starts_with($cfg['webhook_url'], 'https://')) {
    $ctx = stream_context_create(['http' => [
        'method' => 'POST', 'timeout' => 4, 'ignore_errors' => true,
        'header' => "Content-Type: application/json\r\n",
        'content' => json_encode(['source' => 'albgym.de', 'form' => $form] + $fields, JSON_UNESCAPED_UNICODE),
    ]]);
    $r = @file_get_contents($cfg['webhook_url'], false, $ctx);
    $sent = $sent || $r !== false;
}

if (!$sent) {
    respond(false, ['message' => 'Der Versand ist gerade gestört. Bitte ruf uns an (07672 1001) oder schreib an info@albgym.de.'], $wantsJson, 502);
}

$rl[$ipHash][] = $now;
file_put_contents($rlFile, json_encode($rl), LOCK_EX);

$messages = [
    'probetraining' => 'Deine Probetraining-Anfrage ist eingegangen. Wir rufen dich in Kürze an, um deinen persönlichen Termin zu bestätigen.',
    'mitgliedschaft' => 'Deine Anfrage ist eingegangen. Wir melden uns zeitnah persönlich bei dir.',
    'kontakt' => 'Deine Nachricht ist eingegangen. Wir melden uns schnellstmöglich bei dir.',
];
respond(true, ['message' => $messages[$form], 'name' => explode(' ', $name)[0]], $wantsJson);
