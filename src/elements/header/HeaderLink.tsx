import { FC } from 'react';
import clsx from 'clsx';

import { TextInlineLink } from '../text/Text';

import * as Style from './Header.module.scss';

type HeaderLinkProps = {
  onClick?: () => void;
  href?: string;
  children: string;
  samePage?: boolean;
};

const HeaderLink: FC<HeaderLinkProps> = ({ onClick, href, children, samePage }) => {
  const isExternal = !!href && !samePage;
  return (
    <div className={Style.linkHolder}>
      <TextInlineLink
        samePage={samePage}
        href={href}
        onClick={onClick}
        className={clsx(Style.headerLink, { [Style.external]: isExternal })}
      >
        {children}
      </TextInlineLink>
    </div>
  );
};

export { HeaderLink };
