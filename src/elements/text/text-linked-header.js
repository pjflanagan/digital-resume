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
    <OutboundLink
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${Style.textLinkedHeader} ${Style[color]}`}
    >
      <h2 className={className}>
        {children}
      </h2>
    </OutboundLink>
  );
};

export { TextLinkedHeader };
