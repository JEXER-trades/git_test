// Builds a self-contained preview (relative links, WebP only, forms in demo mode)
// for sandboxed static hosting. Usage: node scripts/preview.mjs <outDir>
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'preview'));
await rm(OUT, { recursive: true, force: true });
execFileSync(process.execPath, [path.join(ROOT, 'scripts/build.mjs')], { env: { ...process.env, PREVIEW: '1', OUT }, stdio: 'inherit' });

// Drop server-only files
for (const f of ['api', '.htaccess', 'robots.txt', 'sitemap.xml', 'img']) await rm(path.join(OUT, f), { recursive: true, force: true });
await writeFile(path.join(OUT, 'js/config.js'), 'window.ALBGYM_ANALYTICS = null;\nwindow.ALBGYM_PREVIEW = true;\n');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const toRel = (fromFile, url) => {
  const [pathPart, rest = ''] = url.split(/(?=[?#])/);
  let target = pathPart.replace(/^\//, '');
  if (target === '' || target.endsWith('/')) target += 'index.html';
  const rel = path.relative(path.dirname(fromFile), path.join(OUT, target)).replace(/\\/g, '/');
  return rel + url.slice(pathPart.length);
};

const usedImgs = new Set();
for (const file of await walk(OUT)) {
  if (!file.endsWith('.html')) continue;
  let s = await readFile(file, 'utf8');
  s = s.replace(/(href|src|action)="(\/(?!\/)[^"]*)"/g, (_, a, u) => `${a}="${toRel(file, u)}"`);
  s = s.replace(/srcset="([^"]+)"/g, (_, v) => `srcset="${v.split(',').map((part) => { const [u, d] = part.trim().split(' '); return `${u.startsWith('/') ? toRel(file, u) : u} ${d}`; }).join(', ')}"`);
  for (const m of s.matchAll(/img\/([^"' ,]+\.webp)/g)) usedImgs.add(m[1]);
  await writeFile(file, s);
}
// CSS: font URLs relative to /css/
const cssFile = path.join(OUT, 'css/main.css');
await writeFile(cssFile, (await readFile(cssFile, 'utf8')).replace(/url\('\/fonts\//g, "url('../fonts/"));

for (const f of usedImgs) {
  await mkdir(path.dirname(path.join(OUT, 'img', f)), { recursive: true });
  await copyFile(path.join(ROOT, 'dist/img', f), path.join(OUT, 'img', f));
}

// Entry page: the host wraps it in its own document skeleton
const entry = path.join(OUT, 'index.html');
let home = await readFile(entry, 'utf8');
home = home.replace(/<title>[^<]*<\/title>/, "<title>ALBGYM St. Blasien</title>");
home = home.replace(/^<!doctype html>\s*<html[^>]*>\s*<head>\s*/i, '').replace(/<\/head>\s*<body[^>]*>/i, '').replace(/<\/body>\s*<\/html>\s*$/i, '');
await writeFile(entry, home);
console.log(`Preview ready: ${OUT} (${usedImgs.size} images)`);
