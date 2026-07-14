import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import * as Style from "./style.module.scss";

// TextInlineLink
const TextInlineLink = ({
  href,
  className: classNameProp,
  onMouseOver,
  onFocus,
  children,
  samePage,
  onClick
}) => {
  const className = classNames(
    Style.textInlineLink,
    Style.clickable,
    {
      [classNameProp]: classNameProp,
      [Style.clickable]: !!onClick
    }
  );

  if (!href) {
    return (
      <span
        role="button"
        tabIndex={0}
        className={className}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target={samePage ? '' : '_blank'}
      rel="noreferrer"
      className={className}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
    >
      {children}
    </a>
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
