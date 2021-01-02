import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import PropTypes from 'prop-types';

import Style from "./style.module.scss";

// TextInlineLink
const TextInlineLink = ({
  href,
  className,
  onMouseOver,
  onFocus,
  children,
}) => {
  if (!href) {
    return (
      <span
        role="button"
        tabIndex={0}
        className={`${Style.textInlineLink} ${className}`}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
      >
        {children}
      </span>
    );
  }
  return (
    <OutboundLink
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${Style.textInlineLink} ${className}`}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
    >
      {children}
    </OutboundLink>
  );
};

TextInlineLink.propTypes = {
  href: PropTypes.string,
  onMouseOver: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.string,
};

export {
  TextInlineLink,
};
