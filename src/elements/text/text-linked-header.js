import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import * as Style from './style.module.scss';

const TextLinkedHeader = ({
  href,
  children,
  className,
  color
}) => {
  return (
    <h3 className={className}>
      <OutboundLink
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${Style.textLinkedHeader} ${Style[color]}`}
      >
        {children}
      </OutboundLink>
    </h3>
  );
};

export { TextLinkedHeader };
