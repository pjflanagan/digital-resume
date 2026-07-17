import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './MicroGraphic.module.scss';

type MicroGraphicProps = {
  src: string;
  className?: string;
};

// A small transparent decorative svg graphic meant to sit in a corner of a photo/frame.
// Rendered via CSS mask (rather than <img>) so its color can be set from CSS/theme.
function MicroGraphic({ src, className }: MicroGraphicProps): ReactNode {
  const style = {
    '--micro-graphic-src': `url(${src})`,
  } as CSSProperties;

  return <div className={clsx(Style.microGraphic, className)} style={style} />;
}

export { MicroGraphic };
