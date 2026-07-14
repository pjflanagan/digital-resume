import React, { FC } from 'react';
import classNames from 'classnames';

import { TextInlineLink } from '../text/Text';

import * as Style from './Header.module.scss';

type HeaderProps = {
  children: JSX.Element[];
  className: string;
}


const Header: FC<HeaderProps> = ({
  children,
  className: classNameProp
}) => {
  const className = classNames(Style.header, {
    [classNameProp]: classNameProp,
  })
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export { Header };




