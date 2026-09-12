import type { Drawable } from '@/hooks/useImageSequence';
import type { FocalPoint } from '@/config/palmSequence';
import { clamp } from '@/lib/utils';

export interface CoverRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

/**
 * object-cover, but with a focal point.
 *
 * Plain cover always crops around the centre, which throws away the tower on a
 * narrow viewport. Anchoring the crop to a focal point (configurable per
 * breakpoint) keeps the architecture in frame from 360px to 2560px.
 *
 * @param scale extra push-in on top of cover (camera move across the sequence)
 */
export function coverRect(
  sourceWidth: number,
  sourceHeight: number,
  destWidth: number,
  destHeight: number,
  focal: FocalPoint,
  scale = 1,
): CoverRect {
  if (sourceWidth <= 0 || sourceHeight <= 0 || destWidth <= 0 || destHeight <= 0) {
    return { sx: 0, sy: 0, sw: 1, sh: 1 };
  }

  const coverScale = Math.max(destWidth / sourceWidth, destHeight / sourceHeight) * Math.max(1, scale);

  // Size of the source region that maps onto the destination.
  let sw = destWidth / coverScale;
  let sh = destHeight / coverScale;

  // Never sample outside the bitmap.
  sw = Math.min(sw, sourceWidth);
  sh = Math.min(sh, sourceHeight);

  const sx = clamp((sourceWidth - sw) * focal.x, 0, Math.max(0, sourceWidth - sw));
  const sy = clamp((sourceHeight - sh) * focal.y, 0, Math.max(0, sourceHeight - sh));

  return { sx, sy, sw, sh };
}

export function drawCover(
  ctx: CanvasRenderingContext2D,
  image: Drawable,
  destWidth: number,
  destHeight: number,
  focal: FocalPoint,
  scale = 1,
): void {
  const width = 'width' in image ? image.width : 0;
  const height = 'height' in image ? image.height : 0;
  if (!width || !height) return;

  const { sx, sy, sw, sh } = coverRect(width, height, destWidth, destHeight, focal, scale);

  try {
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, destWidth, destHeight);
  } catch {
    // A closed bitmap or a tainted source must not take the loop down.
  }
}

/**
 * Pick the best drawable for a fractional frame position.
 * Walks outward from the requested index so a missing frame degrades into its
 * nearest neighbour instead of a black flash.
 */
export function resolveFrame(
  frames: (Drawable | null)[],
  index: number,
): { frame: Drawable | null; index: number } {
  const total = frames.length;
  const start = clamp(Math.round(index), 0, total - 1);

  const direct = frames[start];
  if (direct) return { frame: direct, index: start };

  for (let step = 1; step < total; step += 1) {
    const before = start - step;
    const after = start + step;
    if (before >= 0 && frames[before]) return { frame: frames[before] as Drawable, index: before };
    if (after < total && frames[after]) return { frame: frames[after] as Drawable, index: after };
  }

  return { frame: null, index: start };
}

/* ────────────────────────────────────────────────────────────────────────────
   Procedural fallback
   Rendered only when the sequence itself cannot be fetched — a broken hero is
   worse than an abstract one, so we draw something deliberate instead.
   ──────────────────────────────────────────────────────────────────────────── */

export function drawFallbackScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
): void {
  const t = clamp(progress, 0, 1);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#151b18');
  sky.addColorStop(0.52, '#232a24');
  sky.addColorStop(0.78, '#3a3527');
  sky.addColorStop(1, '#0b0b0b');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  // Low sun, drifting up as the sequence advances.
  const sunY = height * (0.74 - t * 0.1);
  const sun = ctx.createRadialGradient(
    width * 0.68,
    sunY,
    0,
    width * 0.68,
    sunY,
    width * 0.32,
  );
  sun.addColorStop(0, 'rgba(191, 168, 117, 0.42)');
  sun.addColorStop(1, 'rgba(191, 168, 117, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, width, height);

  // Horizon.
  const horizon = height * 0.74;
  ctx.strokeStyle = 'rgba(243, 239, 231, 0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(width, horizon);
  ctx.stroke();

  // Monolith: grows toward the viewer, standing in for the tower.
  const towerW = width * (0.1 + t * 0.26);
  const towerH = height * (0.22 + t * 0.5);
  const towerX = width * 0.62 - towerW / 2;
  const towerY = horizon - towerH;

  ctx.fillStyle = 'rgba(11, 11, 11, 0.9)';
  ctx.fillRect(towerX, towerY, towerW, towerH);

  ctx.strokeStyle = 'rgba(183, 177, 166, 0.18)';
  ctx.lineWidth = 1;
  const floors = 14;
  for (let i = 1; i < floors; i += 1) {
    const y = towerY + (towerH / floors) * i;
    ctx.beginPath();
    ctx.moveTo(towerX, y);
    ctx.lineTo(towerX + towerW, y);
    ctx.stroke();
  }

  // Palm silhouettes in the foreground.
  ctx.strokeStyle = 'rgba(11, 11, 11, 0.75)';
  ctx.lineWidth = Math.max(1, width * 0.002);
  const palms = [0.14, 0.24, 0.86];
  for (const px of palms) {
    const baseX = width * px;
    const baseY = height * 0.98;
    const topY = baseY - height * 0.3;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.quadraticCurveTo(baseX + width * 0.012, (baseY + topY) / 2, baseX + width * 0.02, topY);
    ctx.stroke();
    for (let f = 0; f < 6; f += 1) {
      const angle = Math.PI + (f / 5) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(baseX + width * 0.02, topY);
      ctx.quadraticCurveTo(
        baseX + width * 0.02 + Math.cos(angle) * width * 0.05,
        topY + Math.sin(angle) * height * 0.05 - height * 0.02,
        baseX + width * 0.02 + Math.cos(angle) * width * 0.09,
        topY + Math.sin(angle) * height * 0.06 + height * 0.03,
      );
      ctx.stroke();
    }
  }

  // Registration marks, so it still reads as "placeholder" to a developer.
  ctx.strokeStyle = 'rgba(243, 239, 231, 0.22)';
  const inset = Math.min(width, height) * 0.05;
  const arm = Math.min(width, height) * 0.03;
  const corners: [number, number][] = [
    [inset, inset],
    [width - inset, inset],
    [inset, height - inset],
    [width - inset, height - inset],
  ];
  for (const [cx, cy] of corners) {
    const dirX = cx < width / 2 ? 1 : -1;
    const dirY = cy < height / 2 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(cx + dirX * arm, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dirY * arm);
    ctx.stroke();
  }
}
