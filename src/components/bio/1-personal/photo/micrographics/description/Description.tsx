import type { ReactNode } from 'react';

import { TextAccent } from 'src/elements';

import * as Style from './Description.module.scss';

type DescriptionProps = {
  text: string;
};

function Description({ text }: DescriptionProps): ReactNode {
  return (
    <div className={Style.description}>
      <TextAccent mono animate>
        {text}
      </TextAccent>
    </div>
  );
}

export { Description };
