import { useRef, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';

import { useReveal } from 'src/hooks';

import * as Style from './ProgressBar.module.scss';

type ProgressBarProps = {
  className?: string;
  progress: number;
  name: string;
};

function ProgressBar({
  className: classNameProp,
  progress: progressProp,
  name,
}: ProgressBarProps): ReactNode {
  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 40 });
  const progress = isRevealed ? progressProp : 0;

  const leftFill = Math.min(Math.max(progress, 0), 50) * 2;
  const rightFill = Math.min(Math.max(progress - 50, 0), 50) * 2;

  const className = clsx(Style.bar, isRevealed && Style.revealed, classNameProp);

  return (
    <div className={className} ref={ref}>
      <div
        className={Style.barLeft}
        style={{ '--fill': `${leftFill}%` } as CSSProperties}
      >
        <div className={Style.name}>
          {name}
          <span className={Style.line} style={{ width: `${progress / 6}%` }} />
        </div>
      </div>
      <div
        className={Style.barRight}
        style={{ '--fill': `${rightFill}%` } as CSSProperties}
      />
    </div>
  );
}

export { ProgressBar };
