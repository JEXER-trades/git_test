// Static site build: renders every page to dist/<path>/index.html,
// copies static assets, fonts, CSS/JS and writes sitemap.xml.
import { mkdir, writeFile, cp, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { layout } from '../src/layout.mjs';
import { crumbsLd } from '../src/lib.mjs';
import { site } from '../src/data/site.mjs';
import home from '../src/pages/home.mjs';
import * as training from '../src/pages/training.mjs';
import * as more from '../src/pages/more.mjs';
import * as legal from '../src/pages/legal.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');

const pages = [
  home,
  more.about,
  training.overview, training.kraft, training.egym, training.milon, training.cardio, training.skillcourt, training.bodybuilding, training.pt,
  more.ruecken, more.figur, more.kurse, more.wellness, more.neubau, more.mitglied, more.probetraining, more.kontakt,
  legal.impressum, legal.datenschutz, legal.notFound, legal.danke, legal.formError,
];

await mkdir(DIST, { recursive: true });

// Assets
const css = await readFile(path.join(ROOT, 'src/styles/main.css'), 'utf8');
const js = await readFile(path.join(ROOT, 'src/js/main.js'), 'utf8');
const minCss = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/:\s+/g, ':').replace(/;}/g, '}').trim();
const version = crypto.createHash('sha1').update(minCss + js).digest('hex').slice(0, 8);
await mkdir(path.join(DIST, 'css'), { recursive: true });
await mkdir(path.join(DIST, 'js'), { recursive: true });
await writeFile(path.join(DIST, 'css/main.css'), minCss);
await writeFile(path.join(DIST, 'js/main.js'), js);
await cp(path.join(ROOT, 'public'), DIST, { recursive: true });
await mkdir(path.join(DIST, 'fonts'), { recursive: true });
for (const [pkg, files] of [
  ['@fontsource-variable/fraunces', ['fraunces-latin-wght-normal.woff2', 'fraunces-latin-wght-italic.woff2']],
  ['@fontsource-variable/inter', ['inter-latin-wght-normal.woff2']],
]) {
  for (const f of files) await cp(path.join(ROOT, 'node_modules', pkg, 'files', f), path.join(DIST, 'fonts', f));
}

// Pages
const urls = [];
for (const p of pages) {
  const ld = [];
  if (p.crumbs) ld.push(crumbsLd(p.crumbs, p.path));
  if (p.ld) ld.push(...p.ld());
  let htmlOut = layout({ path: p.canonicalPath || p.path, title: p.title, description: p.description, body: p.render(), image: p.image, ld, noindex: p.noindex });
  htmlOut = htmlOut.replace(/__V__/g, version);
  const file = p.path.endsWith('.html') ? path.join(DIST, p.path) : path.join(DIST, p.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, htmlOut);
  if (!p.noindex) urls.push(p.path);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.split('/').length > 3 ? '0.7' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
if (!existsSync(path.join(DIST, 'img'))) console.warn('⚠ dist/img missing – run `npm run images` first');
console.log(`Built ${pages.length} pages (v${version}) → dist/`);
