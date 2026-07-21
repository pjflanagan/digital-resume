import { useRef, type ReactNode } from 'react';
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

  const className = clsx(Style.bar, isRevealed && Style.revealed, classNameProp);

  return (
    <div className={className} ref={ref}>
      <div className={Style.connector} />
      <div className={Style.barLeft} />
      <div className={Style.barRight}>
        <div className={Style.fill} style={{ width: `${progress}%` }} />
        <div className={Style.name}>
          {name}
          <span className={Style.line} style={{ width: `${progress / 6}%` }} />
        </div>
      </div>
    </div>
  );
}

export { ProgressBar };
