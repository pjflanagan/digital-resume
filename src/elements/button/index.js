import React from "react";

import { SVGIcon } from "../icon";

import Links from "./links.json";
import Style from "./style.module.scss";

const RoundButton = (props) => {
  const { name } = props;
  const linkID = name.toLowerCase();
  return (
    <a target="_blank" rel="noreferrer" href={Links[linkID]}>
      <SVGIcon icon={linkID} />
    </a>
  );
};

const LabeledButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  children,
}) => (
  <div className={Style.labeledButton}>
    <a
      className={Style.holder}
      rel="noreferrer"
      target="_blank"
      href={Links[icon]}
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

const LabeledButtonAction = ({ icon, children, onClick }) => (
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

const LabeledButton = (props) => {
  const { icon, onMouseEnter, onMouseLeave, children, onClick } = props;
  if (!!onClick) {
    return (
      <LabeledButtonAction
        onClick={onClick}
        icon={icon}
      >
        {children}
      </LabeledButtonAction>
    );
  }

  return (
    <LabeledButtonLinked
      icon={icon}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </LabeledButtonLinked>
  );
};

export { RoundButton, LabeledButton };
