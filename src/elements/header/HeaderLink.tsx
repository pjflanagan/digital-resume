import { FC } from 'react';

import { TextInlineLink } from '../text/Text';

import * as Style from './Header.module.scss';

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




