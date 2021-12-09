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
    <OutboundLink href={href} target="_blank" rel="noreferrer" className={Style.textLinkedHeaderLink}>
      <h2 className={`${Style.textLinkedHeader} ${className}`}>
        {children}
        <span className={`${Style.arrow} ${Style[color]}`}></span>
      </h2>
    </OutboundLink>
  );
};

export { TextLinkedHeader };
