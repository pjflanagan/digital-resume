import React from "react";
import { OutboundLink, trackCustomEvent } from "gatsby-plugin-google-analytics";

import { SVGIcon } from "../icon";

import Style from "./style.module.scss";

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
  href,
  sameWindow,
}) => {
  const rel = !sameWindow ? "noreferrer" : undefined;
  const target = !sameWindow ? "_blank" : undefined;
  return (
    <div className={Style.labeledButton}>
      <OutboundLink
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
      </OutboundLink>
    </div>
  );
};

class LabeledButtonAction extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    trackCustomEvent({
      category: "button",
      action: "click",
      label: this.props.trackerLabel,
    });
    this.props.onClick();
  }

  render() {
    const { icon, children } = this.props;
    return (
      <div
        className={Style.labeledButton}
        onClick={this.onClick}
        onKeyDown={this.onClick}
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
}



export { LabeledButtonAction, LabeledButtonLinked, LabeledButtonForm };
