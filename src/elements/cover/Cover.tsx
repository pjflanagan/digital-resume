import type { ReactNode } from 'react';

import * as Style from './Cover.module.scss';

function Cover(): ReactNode {
  return <div className={Style.cover}></div>;
}

export { Cover };
