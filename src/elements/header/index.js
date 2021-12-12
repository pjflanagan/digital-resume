import React from 'react';

import { TextInlineLink } from '../text';

import * as Style from './style.module.scss';

const Header = ({
  children
}) => {
  return (
    <div className={Style.header}>
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




