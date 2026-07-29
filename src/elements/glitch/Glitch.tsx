import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Random } from 'src/helpers/random';
import * as Style from './Glitch.module.scss';

type GlitchProps = {
  children: ReactNode;
  glitchIndex: any;
  className?: string;
  strength?: 'weak' | 'medium' | 'strong';
};

function Glitch({ children, glitchIndex, className, strength = 'medium' }: GlitchProps): ReactNode {
  const [glitchState, setGlitchState] = useState<{
    splits: number[];
    offsets: number[];
    glitchCount: number;
  }>({
    splits: [33, 66],
    offsets: [0, 0, 0],
    glitchCount: 0,
  });

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Helper to generate a completely randomized glitch configuration for a given phase
    const generateGlitchConfig = (phase: number) => {
      const numSlices = Random.int(3, 7);
      const rawHeights = Array.from({ length: numSlices }, () => Random.int(10, 40));
      const sum = rawHeights.reduce((acc, h) => acc + h, 0);

      const splits: number[] = [];
      let cumulative = 0;
      for (let i = 0; i < numSlices - 1; i++) {
        cumulative += (rawHeights[i] / sum) * 100;
        splits.push(cumulative);
      }

      const getRandomOffset = () => {
        let min = 4;
        let max = 12;

        if (strength === 'weak') {
          min = 1;
          max = 2;
        } else if (strength === 'strong') {
          min = 8;
          max = 24;
        }

        const val = Random.int(min, max);
        return Random.bool() ? val : -val;
      };

      const offsets = Array.from({ length: numSlices }, () => getRandomOffset());

      return {
        splits,
        offsets,
        glitchCount: phase,
      };
    };

    // Phase 1: Immediate glitch
    setGlitchState(generateGlitchConfig(1));

    // Phase 2: Glitch after 60ms
    const t2 = setTimeout(() => {
      setGlitchState(generateGlitchConfig(2));
    }, 60);
    timers.push(t2);

    // Phase 3: Glitch after 120ms
    const t3 = setTimeout(() => {
      setGlitchState(generateGlitchConfig(3));
    }, 120);
    timers.push(t3);

    // Normal: Reset back to zero offset after 180ms
    const tNormal = setTimeout(() => {
      setGlitchState((prev) => ({
        ...prev,
        offsets: Array(prev.splits.length + 1).fill(0),
        glitchCount: 0,
      }));
    }, 180);
    timers.push(tNormal);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [glitchIndex, strength]);

  const numSlices = glitchState.splits.length + 1;
  const { splits, offsets, glitchCount } = glitchState;
  const isGlitching = glitchCount > 0;

  return (
    <div className={clsx(Style.glitchContainer, className)}>
      {/* Sizer copy to naturally scale the container and handle all user interactions (hovers, clicks, focus) */}
      <div className={clsx(Style.interactiveOverlay, { [Style.glitching]: isGlitching })}>
        {children}
      </div>

      {/* Render each dynamic horizontal slice wrapper */}
      {Array.from({ length: numSlices }, (_, i) => {
        const topPercent = i === 0 ? 0 : splits[i - 1];
        const bottomPercent = i === numSlices - 1 ? 100 : splits[i];

        const clipPath = `polygon(0% ${topPercent}%, 100% ${topPercent}%, 100% ${bottomPercent}%, 0% ${bottomPercent}%)`;
        const offset = offsets[i] ?? 0;

        return (
          <div
            key={i}
            className={clsx(Style.slice, { [Style.glitching]: isGlitching })}
            style={{
              clipPath,
              WebkitClipPath: clipPath,
              transform: `translate3d(${offset}px, 0, 0)`,
            }}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
}

export { Glitch };
