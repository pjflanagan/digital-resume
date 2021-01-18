
import React from "react";
import { OutboundLink, trackCustomEvent } from "gatsby-plugin-google-analytics";

import { SVGIcon } from "../icon";

import Style from "./style.module.scss";

const CircleButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  href,
  sameWindow,
}) => {
  const rel = !sameWindow ? "noreferrer" : undefined;
  const target = !sameWindow ? "_blank" : undefined;
  return (
    <OutboundLink
      target={target}
      rel={rel}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SVGIcon icon={icon} />
    </OutboundLink>
  );
};

class CircleButtonAction extends React.Component {
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
    const { icon } = this.props;
    return (
      <div
        className={Style.circleButton}
        onClick={this.onClick}
        onKeyDown={this.onClick}
        role="button"
        tabIndex={0}
      >
        <SVGIcon icon={icon} />
      </div>
    );
  }
}

export { CircleButtonAction, CircleButtonLinked };