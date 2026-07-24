import type { ReactNode } from 'react';

import * as Style from './Header.module.scss';

type HeaderProps = {
  children: JSX.Element[];
};

function Header({ children }: HeaderProps): ReactNode {
  return <div className={Style.header}>{children}</div>;
}

export { Header };
