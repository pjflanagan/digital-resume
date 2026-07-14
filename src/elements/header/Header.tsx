import { FC } from 'react';
import clsx from 'clsx';

import * as Style from './Header.module.scss';

type HeaderProps = {
  children: JSX.Element[];
  className: string;
};

const Header: FC<HeaderProps> = ({ children, className: classNameProp }) => {
  const className = clsx(Style.header, {
    [classNameProp]: classNameProp,
  });
  return <div className={className}>{children}</div>;
};

export { Header };
