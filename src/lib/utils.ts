import { type ClassValue } from '@/lib/types';

/**
 * Tiny class-name joiner. Deliberately not a dependency — the whole site needs
 * conditional classes, it does not need a library for it.
 */
export function cx(...values: ClassValue[]): string {
  const out: string[] = [];

  const push = (value: ClassValue): void => {
    if (value === null || value === undefined || value === false || value === '') return;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      for (const nested of value) push(nested);
      return;
    }
    for (const [key, active] of Object.entries(value)) {
      if (active) out.push(key);
    }
  };

  for (const value of values) push(value);
  return out.join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/**
 * Frame-rate independent damping. Unlike `lerp(a, b, 0.1)` this behaves the
 * same at 60Hz and 144Hz, which matters for anything driven by rAF.
 */
export function damp(from: number, to: number, smoothing: number, dt: number): number {
  return lerp(from, to, 1 - Math.exp(-smoothing * dt));
}

export function pad3(index: number): string {
  return String(index).padStart(3, '0');
}

/** "7" -> "07" — used by the section index readout. */
export function pad2(index: number): string {
  return String(index).padStart(2, '0');
}

export function percent(value: number, digits = 0): string {
  return `${(clamp(value, 0, 1) * 100).toFixed(digits)}`;
}

/**
 * Writes to a DOM node without going through React. Animation state changes
 * dozens of times a second; routing it through `useState` would re-render the
 * tree every frame for no benefit.
 */
export function setText(node: HTMLElement | null | undefined, value: string): void {
  if (node && node.textContent !== value) node.textContent = value;
}

export function setProgress(
  node: HTMLElement | null | undefined,
  ratio: number,
): void {
  if (!node) return;
  const next = `${(clamp(ratio, 0, 1) * 100).toFixed(2)}%`;
  if (node.style.transform !== `scaleY(${next.replace('%', '')})`) {
    node.style.transform = `scaleY(${clamp(ratio, 0, 1)})`;
  }
}
