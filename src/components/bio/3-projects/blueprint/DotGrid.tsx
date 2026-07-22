import type { ReactNode } from 'react';

import * as Style from './DotGrid.module.scss';

// The dark, dotted "blueprint paper" background that sits behind the
// projects slide's content and decorative Blueprint svgs.
function DotGrid(): ReactNode {
  return <div className={Style.dotGrid} />;
}

export { DotGrid };
