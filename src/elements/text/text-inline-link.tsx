import React from "react";
import classNames from "classnames";

import * as Style from "./style.module.scss";

type TextInlineLinkProps = {
  href?: string;
  className?: string;
  onMouseOver?: () => void;
  onFocus?: () => void;
  children?: React.ReactNode;
  samePage?: boolean;
  onClick?: () => void;
};

// TextInlineLink
const TextInlineLink = ({
  href,
  className: classNameProp,
  onMouseOver,
  onFocus,
  children,
  samePage,
  onClick
}: TextInlineLinkProps) => {
  const className = classNames(
    Style.textInlineLink,
    Style.clickable,
    classNameProp,
    {
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

export {
  TextInlineLink,
};
