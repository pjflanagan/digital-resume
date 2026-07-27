import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './EggMicrographic.module.scss';

type EggMicrographicProps = {
  src: string;
  className?: string;
};

// A small transparent decorative svg graphic meant to sit in a corner of a photo/frame.
// Rendered via CSS mask (rather than <img>) so its color can be set from CSS/theme.
function EggMicrographic({ src, className }: EggMicrographicProps): ReactNode {
  const style = {
    '--egg-micrographic-src': `url(${src})`,
  } as CSSProperties;

  return <div className={clsx(Style.eggMicrographic, className)} style={style} />;
}

export { EggMicrographic };
