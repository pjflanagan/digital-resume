import React from "react";
import { OutboundLink, trackCustomEvent } from "gatsby-plugin-google-analytics";

import { SVGIcon } from "../icon";

import Style from "./style.module.scss";

// TODO: make and use these
// const RoundButton = (props) => {
//   const { name, href } = props;
//   const linkID = name.toLowerCase();
//   return (
//     <OutboundLink target="_blank" rel="noreferrer" href={href}>
//       <SVGIcon icon={linkID} />
//     </OutboundLink>
//   );
// };

const LabeledButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  children,
  href,
}) => (
  <div className={Style.labeledButton}>
    <OutboundLink
      className={Style.holder}
      rel="noreferrer"
      target="_blank"
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

const LabeledButton = (props) => {
  const {
    icon,
    onMouseEnter,
    onMouseLeave,
    children,
    onClick,
    trackerLabel,
    href
  } = props;
  if (!!onClick) {
    return (
      <LabeledButtonAction
        onClick={onClick}
        icon={icon}
        trackerLabel={trackerLabel}
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
      href={href}
    >
      {children}
    </LabeledButtonLinked>
  );
};

export { LabeledButton }; // RoundButton
