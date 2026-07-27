import type { ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './Bars.module.scss';

const BAR_LABELS = ['XR', '7K', 'QZ'];

function Bars(): ReactNode {
  return (
    <div className={Style.bars}>
      {BAR_LABELS.map((label, i) => (
        <div key={label} className={Style.row}>
          <span className={Style.label}>{label}</span>
          <span className={clsx(Style.bar, Style[`bar${i}`])} />
        </div>
      ))}
    </div>
  );
}

export { Bars };
