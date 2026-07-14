import React from "react";
import { SVGIcon } from "src/elements";

import * as Style from "./Button.module.scss";
import classNames from "classnames";

type LabeledButtonFormProps = {
  children?: React.ReactNode;
  icon: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const LabeledButtonForm = ({
  children,
  icon,
  onMouseEnter,
  onMouseLeave
}: LabeledButtonFormProps) => {
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

type LabeledButtonLinkedProps = LabeledButtonFormProps & {
  className?: string;
  href: string;
  sameWindow?: boolean;
  // TODO: internal use Link from 'gatsby'
};

const LabeledButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  children,
  className: classNameProp,
  href,
  sameWindow,
}: LabeledButtonLinkedProps) => {
  const rel = !sameWindow ? "noreferrer" : undefined;
  const target = !sameWindow ? "_blank" : undefined;

  const className = classNames(Style.labeledButton, classNameProp);

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

type LabeledButtonActionProps = {
  icon: string;
  children?: React.ReactNode;
  onClick: () => void;
};

const LabeledButtonAction = ({ icon, children, onClick: propsOnClick }: LabeledButtonActionProps) => {

  const onClick = (e: React.SyntheticEvent) => {
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
