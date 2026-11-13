// Image pipeline: grades every source photo with one consistent "ALBGYM look"
// (slightly desaturated, warm, softly lifted blacks) and writes responsive
// AVIF / WebP / JPEG renditions plus a manifest with intrinsic sizes.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'assets-src/photos');
const OUT = path.join(ROOT, 'dist/img');
const WIDTHS = [480, 800, 1200, 1600, 2400];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

function grade(img) {
  // Unified colour grade: -14% saturation, gentle warm tint, softened contrast.
  return img
    .modulate({ saturation: 0.86, brightness: 1.0 })
    .recomb([
      [1.03, 0.02, 0.0],
      [0.0, 1.0, 0.0],
      [0.0, 0.02, 0.95],
    ])
    .linear(0.94, 6);
}

const manifest = {};
const files = await walk(SRC);
await mkdir(OUT, { recursive: true });

for (const file of files) {
  const rel = path.relative(SRC, file).replace(/\\/g, '/');
  const key = rel.replace(/\.(jpe?g|png)$/i, '');
  const outBase = path.join(OUT, key);
  await mkdir(path.dirname(outBase), { recursive: true });
  const meta = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, 2400));
  const uniq = [...new Set(widths)].sort((a, b) => a - b);
  manifest[key] = { w: meta.width, h: meta.height, widths: uniq };

  const srcStat = await stat(file);
  for (const w of uniq) {
    for (const fmt of ['avif', 'webp', 'jpg']) {
      const out = `${outBase}-${w}.${fmt}`;
      if (existsSync(out) && (await stat(out)).mtimeMs > srcStat.mtimeMs) continue;
      let pipe = grade(sharp(file).rotate().resize({ width: w, withoutEnlargement: true })).removeAlpha();
      if (fmt === 'avif') pipe = pipe.avif({ quality: 52, effort: 4 });
      if (fmt === 'webp') pipe = pipe.webp({ quality: 74 });
      if (fmt === 'jpg') pipe = pipe.jpeg({ quality: 76, mozjpeg: true, progressive: true });
      await pipe.toFile(out);
    }
  }
  // Tiny blurred placeholder colour (dominant tone) for loading state
  const { dominant } = await sharp(file).stats();
  const mix = (c, base) => Math.round(c * 0.35 + base * 0.65);
  manifest[key].tone = `rgb(${mix(dominant.r, 42)},${mix(dominant.g, 41)},${mix(dominant.b, 38)})`;
  process.stdout.write('.');
}

await writeFile(path.join(ROOT, 'src/data/images.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${files.length} images processed`);
