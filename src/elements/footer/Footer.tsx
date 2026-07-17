import type { ReactNode } from 'react';
import clsx from 'clsx';

import { Text } from 'src/elements';
import type { LinkText } from '../text/types';

import * as Style from './Footer.module.scss';

type FooterProps = {
  className?: string;
  text: LinkText<string>[];
};

function Footer({ className: classNameProp, text }: FooterProps): ReactNode {
  const className = clsx(Style.footer, classNameProp);
  return (
    <div className={className}>
      {text.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text links={linkText.links}>{linkText.text}</Text>
        </div>
      ))}
    </div>
  );
}

export { Footer };
