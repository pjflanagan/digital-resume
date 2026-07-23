import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ImageDithering } from '@paper-design/shaders-react';
import clsx from 'clsx';

import * as Style from './DitheredImage.module.scss';

type DitheredImageProps = {
  src: string;
  className?: string;
  // bump this whenever the reveal/change animation should replay
  animateKey: number | string;
};

const SIZE_START = 20;
const SIZE_END = 1;
const ANIMATE_DURATION_MS = 900;

// eases pxSize from a chunky dithered block down to a crisp grid, replaying
// whenever animateKey changes (scroll reveal, or the photo itself changing)
function useDitherReveal(animateKey: number | string): number {
  const [size, setSize] = useState(SIZE_START);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const start = performance.now();

    function tick(now: number): void {
      const progress = Math.min((now - start) / ANIMATE_DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setSize(SIZE_START - (SIZE_START - SIZE_END) * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateKey]);

  return size;
}

// stylized dithered rendering of a photo, using the site's blue theme
// palette in place of the image's original colors
function DitheredImage({ src, className, animateKey }: DitheredImageProps): ReactNode {
  const size = useDitherReveal(animateKey);

  return (
    <div className={clsx(Style.ditheredImageHolder, className)}>
      <ImageDithering
        className={Style.shader}
        width="100%"
        height="100%"
        image={src}
        colorBack={Style.colorBack}
        colorFront={Style.colorFront}
        colorHighlight={Style.colorHighlight}
        originalColors={false}
        inverted={false}
        type={undefined}
        size={size}
        colorSteps={size + 4}
        fit="cover"
      />
    </div>
  );
}

export { DitheredImage };
