import { useRef, type ReactNode } from 'react';
import clsx from 'clsx';

import { useReveal } from 'src/hooks';

import * as Style from './ProgressBar.module.scss';

type ProgressBarProps = {
  progress: number;
  name: string;
  href?: string;
};

function ProgressBar({ progress: progressProp, name, href }: ProgressBarProps): ReactNode {
  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 40 });
  const progress = isRevealed ? progressProp : 0;

  const className = clsx(Style.bar, isRevealed && Style.revealed, href && Style.hasHref);

  const Element = href ? 'a' : 'div';
  const elementProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Element className={className} ref={ref} {...elementProps}>
      <div className={Style.connector} />
      <div className={Style.barLeft} />
      <div className={Style.barRight}>
        <div className={Style.fill} style={{ width: `${progress}%` }} />
        <div className={Style.name}>
          {name}
          <span className={Style.line} style={{ width: `${progress / 6}%` }} />
        </div>
      </div>
    </Element>
  );
}

export { ProgressBar };
