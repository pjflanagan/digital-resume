import type { ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './MicrographicHemisphere.module.scss';

type HemispherePosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

type MicrographicHemisphereProps = {
  position: HemispherePosition;
  // hides this hemisphere below $md, to declutter the photo frame on small screens
  hideSmall?: boolean;
  children: ReactNode;
};

// one quadrant of the photo frame, with its content justified into that quadrant's corner
function MicrographicHemisphere({
  position,
  hideSmall,
  children,
}: MicrographicHemisphereProps): ReactNode {
  return (
    <div className={clsx(Style.hemisphere, Style[position], hideSmall && Style.hideSmall)}>
      {children}
    </div>
  );
}

export { MicrographicHemisphere };
export type { HemispherePosition };
