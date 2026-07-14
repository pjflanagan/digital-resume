import React from "react";

import * as Style from './style.module.scss';
import classNames from "classnames";

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
  const className = classNames(Style.textLinkedHeader, color && Style[color])
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
