import React from 'react';
import classNames from 'classnames';

import { TextInlineLink } from '../text';

import * as Style from './style.module.scss';

const Header = ({
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

const HeaderLink = ({
  onClick,
  href,
  children,
  samePage
}) => {
  return (
    <div className={Style.linkHolder}>
      <TextInlineLink
        samePage={samePage}
        href={href}
        onClick={onClick}
        className={Style.headerLink}
      >
        {children}
      </TextInlineLink>
    </div>
  );
};

export { Header, HeaderLink }




