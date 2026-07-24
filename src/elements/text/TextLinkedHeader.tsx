import React from 'react';

import { linkTargetProps } from 'src/helpers';

import * as Style from './Text.module.scss';
import clsx from 'clsx';

type TextLinkedHeaderProps = {
  href: string;
  children?: React.ReactNode;
  color?: string;
  // h3 sets its own padding directly, so a wrapper can only add to that box,
  // never replace it; this stays a composition seam like ButtonHolder's
  // className, for the cases that need to override it
  className?: string;
};

function TextLinkedHeader({
  href,
  children,
  color,
  className: classNameProp,
}: TextLinkedHeaderProps): React.ReactNode {
  const className = clsx(Style.textLinkedHeader, color && Style[color]);
  return (
    <h3 className={classNameProp}>
      <a href={href} {...linkTargetProps()} className={className}>
        {children}
      </a>
    </h3>
  );
}

export { TextLinkedHeader };
