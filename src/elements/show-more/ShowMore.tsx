import clsx from 'clsx';
import React, { useState } from 'react';

import { LabeledButton, ButtonHolder } from 'src/elements';

import * as Style from './ShowMore.module.scss';

type ShowMoreProps = {
  children?: React.ReactNode;
};

function ShowMore({ children }: ShowMoreProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  function toggle(): void {
    setIsOpen(!isOpen);
  }

  const className = clsx(Style.showMore, {
    [Style.open]: isOpen,
  });

  return (
    <div className={className}>
      <div className={Style.contentHolder}>{children}</div>
      <ButtonHolder className={Style.buttonHolder}>
        <LabeledButton onClick={toggle} icon="plus">
          {'Show more'}
        </LabeledButton>
      </ButtonHolder>
    </div>
  );
}

export { ShowMore };
