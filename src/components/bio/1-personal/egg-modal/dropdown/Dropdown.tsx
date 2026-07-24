import React, { useState } from 'react';

import { SVGIcon } from 'src/elements';
import { activationKeyHandler } from 'src/helpers';

import * as Style from './Dropdown.module.scss';

type DropdownProps = {
  label: React.ReactNode;
  children?: React.ReactNode;
};

function Dropdown({ label, children }: DropdownProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  function toggle(): void {
    setIsOpen(!isOpen);
  }

  return (
    <div className={Style.dropdown}>
      <div
        className={Style.label}
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={activationKeyHandler(toggle)}
      >
        <span>{label}</span>
        <span className={Style.icon}>
          <SVGIcon icon={isOpen ? 'minus' : 'plus'} />
        </span>
      </div>
      {isOpen && <div className={Style.body}>{children}</div>}
    </div>
  );
}

export { Dropdown };
