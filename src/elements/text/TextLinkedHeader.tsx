import React from "react";

import * as Style from './Text.module.scss';
import clsx from "clsx";

type TextLinkedHeaderProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  color?: string;
};

const TextLinkedHeader = ({
  href,
  children,
  className: classNameProp,
  color
}: TextLinkedHeaderProps) => {
  const className = clsx(Style.textLinkedHeader, color && Style[color])
  return (
    <h3 className={classNameProp}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    </h3>
  );
};

export { TextLinkedHeader };
