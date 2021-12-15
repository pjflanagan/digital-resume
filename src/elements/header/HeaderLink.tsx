import React, { FC } from 'react';
import classNames from 'classnames';

import { TextInlineLink } from '../text';

import * as Style from './style.module.scss';

type HeaderLinkProps = {
  onClick?: () => void;
  href?: string;
  children: string;
  samePage?: boolean;
}

const HeaderLink: FC<HeaderLinkProps> = ({
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

export { HeaderLink };




