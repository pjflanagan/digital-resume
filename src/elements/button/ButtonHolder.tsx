import React from 'react';
import clsx from 'clsx';

import * as Style from './ButtonHolder.module.scss';

type ButtonHolderProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  buttonHolderRef?: React.Ref<HTMLDivElement>;
};

// shared centering wrapper for a single button; per-page width/margin/position/animation
// still lives in that page's own module, composed in via className
function ButtonHolder({ children, className, style, buttonHolderRef }: ButtonHolderProps): React.ReactNode {
  return (
    <div ref={buttonHolderRef} className={clsx(Style.buttonHolder, className)} style={style}>
      {children}
    </div>
  );
}

export { ButtonHolder };
