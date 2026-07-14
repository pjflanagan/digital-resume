import React from "react";

import * as Style from './style.module.scss';
import classNames from "classnames";

const TextLinkedHeader = ({
  href,
  children,
  className: classNameProp,
  color
}) => {
  const className = classNames(Style.textLinkedHeader, Style[color])
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
