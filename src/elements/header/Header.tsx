import type { ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './Header.module.scss';

type HeaderProps = {
  children: JSX.Element[];
  className: string;
};

function Header({ children, className: classNameProp }: HeaderProps): ReactNode {
  const className = clsx(Style.header, {
    [classNameProp]: classNameProp,
  });
  return <div className={className}>{children}</div>;
}

export { Header };
