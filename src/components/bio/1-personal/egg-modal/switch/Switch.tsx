import React from 'react';
import clsx from 'clsx';

import * as Style from './Switch.module.scss';

type SwitchOption<T extends string> = {
  value: T;
  label: React.ReactNode;
};

type SwitchProps<T extends string> = {
  options: SwitchOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

function Switch<T extends string>({ options, value, onChange }: SwitchProps<T>): React.ReactNode {
  return (
    <div className={Style.switchRoot}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={clsx(Style.option, { [Style.active]: option.value === value })}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export { Switch };
