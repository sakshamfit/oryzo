'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cx } from '@/lib/utils';
import { Magnetic } from '@/components/ui/Magnetic';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';

type CommonProps = {
  variant?: ButtonVariant;
  /** Adds a travelling arrow. `up-right` for CTAs, `right` for inline links. */
  arrow?: 'up-right' | 'right' | 'none';
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeProps;

const base =
  'group/button relative inline-flex items-center justify-center gap-3 overflow-hidden ' +
  'pp-label !tracking-[0.28em] transition-colors duration-500 focus-visible:outline-gold ' +
  'select-none';

const variants: Record<ButtonVariant, string> = {
  solid:
    'bg-gold text-obsidian hover:bg-ivory px-[clamp(1.6rem,3vw,2.4rem)] py-[clamp(0.9rem,1.6vh,1.15rem)]',
  outline:
    'border border-ivory/30 text-ivory hover:border-gold hover:text-gold px-[clamp(1.6rem,3vw,2.4rem)] py-[clamp(0.9rem,1.6vh,1.15rem)]',
  ghost: 'text-ivory/80 hover:text-gold px-1 py-2',
};

/**
 * The single button language of the site: hairline borders, gold on hover,
 * uppercase tracked label, and a travelling arrow. Always wrapped in Magnetic
 * on desktop for that weighted, premium feel.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'outline',
    arrow = 'up-right',
    magnetic = true,
    className,
    children,
    ...rest
  } = props;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow !== 'none' && (
        <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:translate-x-1 group-hover/button:-translate-y-0.5">
          {arrow === 'up-right' ? (
            <ArrowUpRight className="h-[1em] w-[1em]" strokeWidth={1.4} aria-hidden="true" />
          ) : (
            <ArrowRight className="h-[1em] w-[1em]" strokeWidth={1.4} aria-hidden="true" />
          )}
        </span>
      )}
    </>
  );

  const classes = cx(base, variants[variant], className);

  const content =
    'href' in rest && typeof rest.href === 'string' ? (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {inner}
      </a>
    ) : (
      <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
        {inner}
      </button>
    );

  if (!magnetic) return content;
  return <Magnetic>{content}</Magnetic>;
}

export default Button;
