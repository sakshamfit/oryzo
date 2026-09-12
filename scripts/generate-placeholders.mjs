/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Palm Paradise — placeholder art generator
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Everything under /public/assets/palm-paradise/ is generated here, so the site
 * is fully browsable before any real footage or renders exist. The output is a
 * deliberately abstract "architectural blueprint / composition study" language:
 * gradients, a growing monolith, palm silhouettes and registration marks. It is
 * clearly a placeholder, but it never looks broken.
 *
 * The 30-frame sequence is interpolated across `t` so scrolling through the
 * placeholders reads as a continuous camera dolly — approach, reveal, aerial.
 *
 * To regenerate after tweaking:
 *
 *     npm run assets:generate
 *
 * Real assets simply overwrite these files; this script is only for the design
 * phase. It is safe to delete once the client delivers photography.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'palm-paradise');

/* Palette — mirrors src/styles/globals.css tokens. */
const C = {
  obsidian: '#0B0B0B',
  soft: '#121211',
  ivory: '#F3EFE7',
  gold: '#BFA875',
  stone: '#B7B1A6',
  forest: '#18231C',
};

const FONT = 'DejaVu Sans';

/* ── tiny SVG builders ─────────────────────────────────────────────────────── */

const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

function sky(id, w, h, warm = 0.5) {
  return (
    `<defs><linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${C.forest}"/>` +
    `<stop offset="0.5" stop-color="${shade(C.forest, 1.25)}"/>` +
    `<stop offset="${0.72 + warm * 0.06}" stop-color="${mix(C.forest, C.gold, 0.18 + warm * 0.12)}"/>` +
    `<stop offset="1" stop-color="${C.obsidian}"/>` +
    `</linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#sky${id})"/>`
  );
}

function sun(cx, cy, r, opacity = 0.4, id = 's') {
  return (
    `<defs><radialGradient id="sun${id}"><stop offset="0" stop-color="${C.gold}" stop-opacity="${opacity}"/>` +
    `<stop offset="1" stop-color="${C.gold}" stop-opacity="0"/></radialGradient></defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sun${id})"/>`
  );
}

function monolith(x, y, w, h, floors = 14, alpha = 0.92) {
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.obsidian}" opacity="${alpha}"/>`;
  for (let i = 1; i < floors; i += 1) {
    const yy = y + (h / floors) * i;
    out += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="${C.stone}" stroke-opacity="0.16" stroke-width="1"/>`;
  }
  out += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${C.gold}" stroke-opacity="0.35" stroke-width="1"/>`;
  return out;
}

function palm(x, baseY, s, flip = false) {
  const dir = flip ? -1 : 1;
  const topY = baseY - s;
  let out = `<g stroke="${C.obsidian}" stroke-width="${Math.max(1.4, s * 0.05)}" fill="none" opacity="0.82">`;
  out += `<path d="M ${x} ${baseY} q ${s * 0.12 * dir} ${-s * 0.5} ${s * 0.2 * dir} ${-s}"/>`;
  for (let f = 0; f < 6; f += 1) {
    const a = Math.PI + (f / 5) * Math.PI;
    out +=
      `<path d="M ${x + s * 0.2 * dir} ${topY} ` +
      `Q ${x + s * 0.2 * dir + Math.cos(a) * s * 0.5} ${topY + Math.sin(a) * s * 0.5 - s * 0.2} ` +
      `${x + s * 0.2 * dir + Math.cos(a) * s * 0.9} ${topY + Math.sin(a) * s * 0.6 + s * 0.3}"/>`;
  }
  return out + `</g>`;
}

function corners(w, h, inset, arm) {
  const pts = [
    [inset, inset, 1, 1],
    [w - inset, inset, -1, 1],
    [inset, h - inset, 1, -1],
    [w - inset, h - inset, -1, -1],
  ];
  return pts
    .map(
      ([x, y, dx, dy]) =>
        `<path d="M ${x + arm * dx} ${y} L ${x} ${y} L ${x} ${y + arm * dy}" stroke="${C.ivory}" stroke-opacity="0.25" fill="none" stroke-width="1"/>`,
    )
    .join('');
}

function meta(w, h, left, right) {
  const y = h - Math.round(h * 0.045);
  return (
    `<text x="${Math.round(w * 0.035)}" y="${y}" font-family="${FONT}" font-size="${Math.round(h * 0.028)}" letter-spacing="${Math.round(h * 0.014)}" fill="${C.stone}" opacity="0.65">${left}</text>` +
    `<text x="${Math.round(w * 0.965)}" y="${y}" text-anchor="end" font-family="${FONT}" font-size="${Math.round(h * 0.028)}" letter-spacing="${Math.round(h * 0.014)}" fill="${C.gold}" opacity="0.8">${right}</text>`
  );
}

function ground(w, h, horizon) {
  return (
    `<defs><linearGradient id="g${horizon}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${shade(C.obsidian, 1.6)}"/><stop offset="1" stop-color="${C.obsidian}"/>` +
    `</linearGradient></defs>` +
    `<rect x="0" y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#g${horizon})"/>` +
    `<line x1="0" y1="${horizon}" x2="${w}" y2="${horizon}" stroke="${C.ivory}" stroke-opacity="0.14" stroke-width="1"/>`
  );
}

/* Colour math (hex). */
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}
function mix(a, b, t) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
}
function shade(hex, f) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * f, g * f, b * f);
}

const lerp = (a, b, t) => a + (b - a) * t;

/* ── painters ──────────────────────────────────────────────────────────────── */

/** Interpolated cinematic frame, t in [0,1]. */
function sequenceFrame(t, i) {
  const W = 1600;
  const H = 900;
  const horizon = lerp(H * 0.72, H * 0.78, t);

  let out = sky('seq', W, H, 0.4 + t * 0.3);
  out += sun(W * lerp(0.7, 0.62, t), lerp(H * 0.68, H * 0.5, t), lerp(W * 0.16, W * 0.3, t), 0.34 + t * 0.1, 'seq');

  // Distant skyline recedes as we approach.
  out += `<rect x="0" y="${horizon - H * 0.05}" width="${W}" height="${H * 0.05}" fill="${C.obsidian}" opacity="0.5"/>`;

  // The tower: small at t=0 (distant), dominant by t=1 (aerial reveal).
  const tw = lerp(W * 0.09, W * 0.42, t);
  const th = lerp(H * 0.26, H * 0.66, t);
  const tx = W * lerp(0.62, 0.58, t) - tw / 2;
  const ty = horizon - th;
  out += monolith(tx, ty, tw, th, Math.round(lerp(8, 22, t)), 0.94);

  // Secondary block for depth.
  const sw = lerp(W * 0.06, W * 0.2, t);
  out += monolith(tx - sw - lerp(W * 0.02, W * 0.06, t), horizon - lerp(H * 0.14, H * 0.4, t), sw, lerp(H * 0.14, H * 0.4, t), 10, 0.8);

  out += ground(W, H, horizon);

  // Palms grow toward the viewer at the frame edges.
  const ps = lerp(H * 0.1, H * 0.42, t);
  out += palm(W * 0.1, H * 0.99, ps, false);
  out += palm(W * 0.9, H * 0.99, ps * 0.9, true);

  out += corners(W, H, Math.min(W, H) * 0.05, Math.min(W, H) * 0.03);
  out += meta(W, H, 'PALM PARADISE — PLACEHOLDER', `FRAME ${String(i).padStart(3, '0')} / 30`);

  return svg(W, H, out);
}

/** Generic "architecture study" with a layout seed. */
function architectureStudy(seed, w, h, right) {
  let out = sky(`a${seed}`, w, h, 0.5);
  const horizon = h * 0.74;
  out += sun(w * 0.66, h * 0.52, w * 0.22, 0.3, `a${seed}`);
  const cols = 3 + (seed % 3);
  for (let i = 0; i < cols; i += 1) {
    const bw = w / cols;
    const bh = h * (0.25 + ((seed * 7 + i * 13) % 10) / 22);
    out += monolith(i * bw + bw * 0.14, horizon - bh, bw * 0.72, bh, 12, 0.88);
  }
  out += ground(w, h, horizon);
  out += palm(w * 0.08, h * 0.99, h * 0.3, false);
  out += corners(w, h, Math.min(w, h) * 0.04, Math.min(w, h) * 0.03);
  out += meta(w, h, 'PALM PARADISE — PLACEHOLDER', right);
  return svg(w, h, out);
}

/** Interior-like placeholder: warm plane, window grid, light shaft. */
function interiorStudy(seed, w, h, right) {
  let out = `<defs><linearGradient id="in${seed}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${shade(C.soft, 1.4)}"/><stop offset="1" stop-color="${C.obsidian}"/>` +
    `</linearGradient>` +
    `<linearGradient id="shaft${seed}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${C.gold}" stop-opacity="0.28"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/>` +
    `</linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#in${seed})"/>`;
  // Window mullions on the right.
  const wx = w * 0.58;
  const cols = 4;
  const rows = 6;
  for (let i = 0; i <= cols; i += 1) {
    const x = wx + (w - wx - w * 0.06) * (i / cols);
    out += `<line x1="${x}" y1="${h * 0.08}" x2="${x}" y2="${h * 0.92}" stroke="${C.stone}" stroke-opacity="0.22" stroke-width="2"/>`;
  }
  for (let j = 0; j <= rows; j += 1) {
    const y = h * 0.08 + (h * 0.84) * (j / rows);
    out += `<line x1="${wx}" y1="${y}" x2="${w * 0.94}" y2="${y}" stroke="${C.stone}" stroke-opacity="0.16" stroke-width="1"/>`;
  }
  out += `<rect x="${wx}" y="${h * 0.08}" width="${w * 0.94 - wx}" height="${h * 0.84}" fill="${mix(C.forest, C.gold, 0.2)}" opacity="0.22"/>`;
  // Light shaft across the floor.
  out += `<path d="M ${wx} ${h * 0.9} L ${w * 0.9} ${h * 0.12} L ${w * 0.75} ${h * 0.1} L ${w * 0.2} ${h * 0.94} Z" fill="url(#shaft${seed})"/>`;
  // Furniture block.
  out += `<rect x="${w * 0.12}" y="${h * 0.66}" width="${w * 0.3}" height="${h * 0.12}" rx="4" fill="${C.obsidian}" opacity="0.85"/>`;
  out += `<rect x="${w * 0.16}" y="${h * 0.58}" width="${w * 0.2}" height="${h * 0.08}" rx="4" fill="${C.obsidian}" opacity="0.7"/>`;
  out += corners(w, h, Math.min(w, h) * 0.04, Math.min(w, h) * 0.03);
  out += meta(w, h, 'PALM PARADISE — PLACEHOLDER', right);
  return svg(w, h, out);
}

/** Stylised site map: road network + pulsing-ready marker anchors. */
function mapStudy() {
  const w = 2000;
  const h = 1400;
  let out = `<rect width="${w}" height="${h}" fill="${shade(C.forest, 0.6)}"/>`;
  // Soft district blobs.
  for (const [x, y, r, o] of [
    [w * 0.7, h * 0.2, 260, 0.05],
    [w * 0.25, h * 0.3, 220, 0.04],
    [w * 0.5, h * 0.7, 300, 0.05],
  ]) {
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.ivory}" opacity="${o}"/>`;
  }
  // Road grid (curved avenues).
  out += `<g stroke="${C.stone}" stroke-opacity="0.28" fill="none">`;
  out += `<path d="M 0 ${h * 0.42} C ${w * 0.3} ${h * 0.36}, ${w * 0.6} ${h * 0.5}, ${w} ${h * 0.42}" stroke-width="6"/>`;
  out += `<path d="M ${w * 0.42} 0 C ${w * 0.4} ${h * 0.3}, ${w * 0.5} ${h * 0.7}, ${w * 0.46} ${h}" stroke-width="6"/>`;
  out += `<path d="M 0 ${h * 0.75} C ${w * 0.35} ${h * 0.7}, ${w * 0.7} ${h * 0.8}, ${w} ${h * 0.72}" stroke-width="3"/>`;
  out += `<path d="M ${w * 0.75} 0 C ${w * 0.74} ${h * 0.4}, ${w * 0.8} ${h * 0.7}, ${w * 0.78} ${h}" stroke-width="3"/>`;
  out += `<path d="M 0 ${h * 0.15} C ${w * 0.3} ${h * 0.12}, ${w * 0.6} ${h * 0.2}, ${w} ${h * 0.14}" stroke-width="3"/>`;
  out += `</g>`;
  // Fine block grid.
  out += `<g stroke="${C.ivory}" stroke-opacity="0.06">`;
  for (let x = 0; x < w; x += 80) out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y < h; y += 80) out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  out += `</g>`;
  // Site marker (the development).
  out += `<circle cx="${w * 0.5}" cy="${h * 0.52}" r="26" fill="${C.gold}"/>`;
  out += `<circle cx="${w * 0.5}" cy="${h * 0.52}" r="52" fill="none" stroke="${C.gold}" stroke-opacity="0.5" stroke-width="2"/>`;
  out += `<text x="${w * 0.5}" y="${h * 0.52 - 70}" text-anchor="middle" font-family="${FONT}" font-size="34" letter-spacing="8" fill="${C.ivory}">PALM PARADISE</text>`;
  out += corners(w, h, 60, 40);
  out += meta(w, h, 'PALM PARADISE — LOCATION STUDY', 'PLACEHOLDER MAP');
  return svg(w, h, out);
}

/* ── run ───────────────────────────────────────────────────────────────────── */

const jobs = [];
function add(path, svgString, w, h) {
  jobs.push({ path, svgString, w, h });
}

// Sequence: 30 interpolated frames.
for (let i = 1; i <= 30; i += 1) {
  const t = (i - 1) / 29;
  add(`sequence/frame-${String(i).padStart(3, '0')}.jpg`, sequenceFrame(t, i), 1600, 900);
}

// Architecture.
add('architecture/hero.jpg', architectureStudy(3, 2400, 1350, 'HERO'), 2400, 1350);
add('architecture/detail-01.jpg', interiorStudy(1, 1200, 1600, 'DETAIL 01'), 1200, 1600);
add('architecture/detail-02.jpg', architectureStudy(5, 1200, 1600, 'DETAIL 02'), 1200, 1600);
add('architecture/architecture-01.jpg', architectureStudy(1, 1600, 1200, 'ELEVATION 01'), 1600, 1200);
add('architecture/architecture-02.jpg', architectureStudy(2, 1600, 1200, 'ELEVATION 02'), 1600, 1200);
add('architecture/architecture-03.jpg', interiorStudy(3, 1600, 1200, 'ELEVATION 03'), 1600, 1200);

// Residences (interiors).
add('residences/residence-01.jpg', interiorStudy(2, 1600, 1200, '2 BHK'), 1600, 1200);
add('residences/residence-02.jpg', interiorStudy(4, 1600, 1200, '3 BHK'), 1600, 1200);
add('residences/residence-03.jpg', interiorStudy(6, 1600, 1200, 'PENTHOUSE'), 1600, 1200);

// Lifestyle.
add('lifestyle/lifestyle-01.jpg', interiorStudy(7, 1400, 1900, 'MORNING'), 1400, 1900);
add('lifestyle/lifestyle-02.jpg', architectureStudy(8, 2000, 1300, 'EVENING'), 2000, 1300);
add('lifestyle/lifestyle-03.jpg', architectureStudy(9, 2000, 1300, 'PACE'), 2000, 1300);
add('lifestyle/lifestyle-04.jpg', interiorStudy(10, 1400, 1900, 'BREATHE'), 1400, 1900);

// Gallery (matches ratio metadata in projectData).
add('gallery/gallery-01.jpg', architectureStudy(11, 1200, 1600, 'GALLERY 01'), 1200, 1600);
add('gallery/gallery-02.jpg', architectureStudy(12, 1800, 1200, 'GALLERY 02'), 1800, 1200);
add('gallery/gallery-03.jpg', interiorStudy(13, 1400, 1400, 'GALLERY 03'), 1400, 1400);
add('gallery/gallery-04.jpg', interiorStudy(14, 1200, 1600, 'GALLERY 04'), 1200, 1600);
add('gallery/gallery-05.jpg', architectureStudy(15, 1800, 1200, 'GALLERY 05'), 1800, 1200);
add('gallery/gallery-06.jpg', architectureStudy(16, 1200, 1600, 'GALLERY 06'), 1200, 1600);

// Location.
add('location/map.jpg', mapStudy(), 2000, 1400);

let totalBytes = 0;
for (const job of jobs) {
  const out = join(ROOT, job.path);
  await mkdir(dirname(out), { recursive: true });
  const buf = await sharp(Buffer.from(job.svgString))
    .jpeg({ quality: 72, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toBuffer();
  totalBytes += buf.length;
  await sharp(buf).toFile(out);
}

console.log(`Generated ${jobs.length} placeholder images (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
