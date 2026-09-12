'use client';

import type { RefObject } from 'react';
import type { SequenceState } from '@/hooks/useImageSequence';

export interface SequenceDebugProps {
  frameRef: RefObject<HTMLSpanElement | null>;
  percentRef: RefObject<HTMLSpanElement | null>;
  state: SequenceState;
  visible: boolean;
}

/**
 * Corner readout for development only.
 *
 * Mounted solely when NEXT_PUBLIC_SEQUENCE_DEBUG=true; in production builds the
 * flag is inlined as `false` and the component is never rendered. Values are
 * written straight into the spans by the canvas loop — no React renders.
 */
export function SequenceDebug({ frameRef, percentRef, state, visible }: SequenceDebugProps) {
  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-4 bottom-4 z-[90] select-none border border-gold/30 bg-obsidian/80 px-3 py-2 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-gold/90 uppercase backdrop-blur-sm"
    >
      <div>
        frame: <span ref={frameRef}>01 / 30</span>
      </div>
      <div>
        progress: <span ref={percentRef}>0%</span>
      </div>
      <div className="mt-1 text-ivory/45">
        decoded {state.loaded}/{state.total} · {state.variant}
        {state.failures > 0 ? ` · ${state.failures} missing` : ''}
      </div>
      <div className="text-ivory/30">{state.status}</div>
    </div>
  );
}

export default SequenceDebug;
