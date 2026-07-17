import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { FrameHolder } from 'src/elements';

import * as Style from './FocusFrame.module.scss';

// Coordinates are percentages of the container's rendered size, so the
// frame stays over the same relative spot on the image as it resizes.
// x/y is the top-left corner; width/height extend right/down from there.
type FocusArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type FocusFrameProps = {
  children: React.ReactNode;
  area: FocusArea;
  className?: string;
};

const FocusFrame = ({ children, area, className }: FocusFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstClickRef = useRef<{ x: number; y: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timeout);
  }, [area.x, area.y, area.width, area.height]);

  // dev helper: click the top-left corner of the desired frame, then the
  // bottom-right corner, to log the x/y and width/height percentages to enter above
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (process.env.NODE_ENV === 'production') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (!firstClickRef.current) {
      firstClickRef.current = { x, y };
      console.log('focusArea x/y:', { x: Math.round(x), y: Math.round(y) });
    } else {
      const width = x - firstClickRef.current.x;
      const height = y - firstClickRef.current.y;
      console.log('focusArea width/height:', { width: Math.round(width), height: Math.round(height) });
      firstClickRef.current = null;
    }
  };

  return (
    <div ref={containerRef} className={clsx(Style.focusFrameHolder, className)} onClick={handleClick}>
      {children}
      <FrameHolder
        className={clsx(Style.focusBox, { [Style.animating]: isAnimating })}
        style={{
          left: `${area.x}%`,
          top: `${area.y}%`,
          width: `${area.width}%`,
          height: `${area.height}%`,
        }}
      />
    </div>
  );
};

export { FocusFrame };
export type { FocusArea };
