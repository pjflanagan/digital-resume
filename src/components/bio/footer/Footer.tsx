import type { ReactNode } from 'react';

import { Text } from 'src/elements';
import type { LinkText } from 'src/elements/text/types';

import * as Style from './Footer.module.scss';

type FooterProps = {
  text: LinkText<string>[];
};

function Footer({ text }: FooterProps): ReactNode {
  return (
    <div className={Style.footer}>
      {text.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text links={linkText.links}>{linkText.text}</Text>
        </div>
      ))}
    </div>
  );
}

export { Footer };
