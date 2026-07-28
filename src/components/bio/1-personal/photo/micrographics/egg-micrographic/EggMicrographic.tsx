import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Random } from 'src/helpers/random';
import * as Style from './EggMicrographic.module.scss';

type EggMicrographicProps = {
  src: string;
  className?: string;
};

// A small transparent decorative svg graphic meant to sit in a corner of a photo/frame.
// Rendered via CSS mask (rather than <img>) so its color can be set from CSS/theme.
// Glitches on each source change by splitting into a variable number of horizontal slices (3-7) with random offsets.
function EggMicrographic({ src, className }: EggMicrographicProps): ReactNode {
  const [glitchState, setGlitchState] = useState<{
    splits: number[];
    offsets: number[];
  }>({
    splits: [33, 66],
    offsets: [0, 0, 0],
  });

  useEffect(() => {
    // Generate a random number of slices between 3 and 7
    const numSlices = Random.int(3, 7);

    // Generate random raw heights for each slice (each between 10 and 40 units)
    const rawHeights = Array.from({ length: numSlices }, () => Random.int(10, 40));
    const sum = rawHeights.reduce((acc, h) => acc + h, 0);

    // Normalize raw heights so they sum to exactly 100%, and calculate cumulative split percentages
    const splits: number[] = [];
    let cumulative = 0;
    for (let i = 0; i < numSlices - 1; i++) {
      cumulative += (rawHeights[i] / sum) * 100;
      splits.push(cumulative);
    }

    const getRandomOffset = () => {
      const val = Random.int(4, 12);
      return Random.bool() ? val : -val;
    };

    const offsets = Array.from({ length: numSlices }, () => getRandomOffset());

    setGlitchState({
      splits,
      offsets,
    });

    const timer = setTimeout(() => {
      setGlitchState((prev) => ({
        ...prev,
        offsets: Array(prev.splits.length + 1).fill(0),
      }));
    }, 150);

    return () => clearTimeout(timer);
  }, [src]);

  const style = {
    '--egg-micrographic-src': `url(${src})`,
  } as CSSProperties;

  const numSlices = glitchState.splits.length + 1;
  const { splits, offsets } = glitchState;

  return (
    <div className={clsx(Style.eggMicrographic, className)} style={style}>
      {Array.from({ length: numSlices }, (_, i) => {
        const topPercent = i === 0 ? 0 : splits[i - 1];
        const bottomPercent = i === numSlices - 1 ? 100 : splits[i];

        const clipPath = `polygon(0% ${topPercent}%, 100% ${topPercent}%, 100% ${bottomPercent}%, 0% ${bottomPercent}%)`;
        const offset = offsets[i] ?? 0;

        return (
          <div
            key={i}
            className={Style.slice}
            style={{
              clipPath,
              WebkitClipPath: clipPath,
              transform: `translate3d(${offset}px, 0, 0)`,
            }}
          />
        );
      })}
    </div>
  );
}

export { EggMicrographic };
