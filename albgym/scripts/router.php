<?php
// Local dev router for `php -S` (mimics Apache: directory index + 404 page).
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$file = __DIR__ . '/../dist' . $uri;
if (str_starts_with($uri, '/api/')) { return false; }
if (is_file($file)) { return false; }
if (is_dir($file) && is_file(rtrim($file, '/') . '/index.html')) {
    if (!str_ends_with($uri, '/')) { header('Location: ' . $uri . '/', true, 301); exit; }
    readfile(rtrim($file, '/') . '/index.html');
    exit;
}
http_response_code(404);
readfile(__DIR__ . '/../dist/404.html');
