import { PALM_SEQUENCE } from '@/config/palmSequence';

/**
 * Warms the HTTP cache with the first desktop frames before the client loader
 * even asks, shaving the perceived boot time. `media` gates the download so
 * phones never pay for the desktop set. Next hoists these <link> tags into
 * <head> automatically.
 */
export function SequencePreload() {
  const warm = [1, 2, 3];

  return (
    <>
      {warm.map((i) => (
        <link
          key={`d${i}`}
          rel="preload"
          as="image"
          href={PALM_SEQUENCE.filePattern(i)}
          // @ts-expect-error fetchPriority is a valid DOM attr, React types lag.
          fetchpriority="high"
          media="(min-width: 768px)"
        />
      ))}
    </>
  );
}

export default SequencePreload;
