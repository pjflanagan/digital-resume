import React from "react";
import { SVGIcon } from "src/elements";

import * as Style from "./style.module.scss";
import classNames from "classnames";

const LabeledButtonForm = ({
  children,
  icon,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <button
      className={`${Style.labeledButton} ${Style.buttonReset}`}
      type="submit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={Style.holder}>
        <div className={Style.svgHolder}>
          <SVGIcon icon={icon} />
        </div>
        <div className={Style.name}>{children}</div>
      </div>
    </button>
  );
};

const LabeledButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  children,
  className: classNameProp,
  href,
  sameWindow,
  // TODO: internal use Link from 'gatsby'
}) => {
  const rel = !sameWindow ? "noreferrer" : undefined;
  const target = !sameWindow ? "_blank" : undefined;

  const className = classNames(Style.labeledButton, {
    [classNameProp]: classNameProp
  })

  return (
    <div className={className}>
      <a
        className={Style.holder}
        rel={rel}
        target={target}
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={Style.svgHolder}>
          <SVGIcon icon={icon} />
        </div>
        <div className={Style.name}>{children}</div>
      </a>
    </div>
  );
};

const LabeledButtonAction = ({ icon, children, onClick: propsOnClick }) => {

  const onClick = (e) => {
    e.preventDefault();
    propsOnClick();
  }

  return (
    <div
      className={Style.labeledButton}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={Style.holder}>
        <div className={Style.svgHolder}>
          <SVGIcon icon={icon} />
        </div>
        <div className={Style.name}>{children}</div>
      </div>
    </div>
  );
}

export { LabeledButtonAction, LabeledButtonLinked, LabeledButtonForm };
