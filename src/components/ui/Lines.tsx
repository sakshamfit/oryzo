import type { ReactNode } from 'react';

/**
 * Wraps each line in an overflow-hidden mask (`.pp-line`) whose inner
 * `data-line` span is animated by <Reveal variant="line" />.
 *
 * Accessible: the wrapper spans are presentational and the full heading text
 * remains in reading order.
 */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span className="pp-line" key={i}>
          <span data-line>{line}</span>
        </span>
      ))}
    </>
  );
}

export default Lines;
