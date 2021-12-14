import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

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
      <OutboundLink
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </OutboundLink>
    </h3>
  );
};

export { TextLinkedHeader };
