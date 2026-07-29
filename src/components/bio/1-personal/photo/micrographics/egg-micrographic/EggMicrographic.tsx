import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import { Glitch } from 'src/elements';
import * as Style from './EggMicrographic.module.scss';

type EggMicrographicProps = {
  src: string;
  className?: string;
};

// A small transparent decorative svg graphic meant to sit in a corner of a photo/frame.
// Rendered via CSS mask (rather than <img>) so its color can be set from CSS/theme.
// Wrapped in the Glitch component to trigger a 3-phase horizontal layout glitch when the source changes.
function EggMicrographic({ src, className }: EggMicrographicProps): ReactNode {
  const style = {
    '--egg-micrographic-src': `url(${src})`,
  } as CSSProperties;

  return (
    <Glitch glitchIndex={src} className={className}>
      <div className={clsx(Style.eggMicrographic)} style={style} />
    </Glitch>
  );
}

export { EggMicrographic };
