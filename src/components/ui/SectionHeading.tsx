'use client';

import { cx } from '@/lib/utils';
import { Lines } from '@/components/ui/Lines';
import { Reveal } from '@/components/ui/Reveal';

export interface SectionHeadingProps {
  label: string;
  /** Each string becomes a masked line of display type. */
  lines: readonly string[];
  /** `dark` = ivory text on dark, `light` = obsidian text on warm sections. */
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  accentLine?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * The editorial heading block used by every section: a small gold index label,
 * then oversized display type unveiled line by line.
 */
export function SectionHeading({
  label,
  lines,
  tone = 'dark',
  align = 'left',
  accentLine,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const isLight = tone === 'light';

  return (
    <div className={cx('mb-[clamp(2.5rem,7vh,5.5rem)]', align === 'center' && 'text-center', className)}>
      {label ? (
        <Reveal variant="fade">
          <p className={cx('pp-label mb-6', isLight ? 'text-forest/60' : 'text-gold/85')}>{label}</p>
        </Reveal>
      ) : null}

      <Reveal variant="line">
        <Tag
          className={cx(
            'text-h2 font-sans font-extralight',
            isLight ? 'text-obsidian' : 'text-ivory',
          )}
        >
          <Lines
            lines={lines.map((line, i) =>
              accentLine === i ? (
                <span key={i} className={isLight ? 'italic text-gold' : 'font-serif italic text-gold'}>
                  {line}
                </span>
              ) : (
                <span key={i}>{line}</span>
              ),
            )}
          />
        </Tag>
      </Reveal>
    </div>
  );
}

export default SectionHeading;
