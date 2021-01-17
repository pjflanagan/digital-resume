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

const LabeledButtonForm = ({
  children,
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
          <SVGIcon icon="saturn" />
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

const LabeledButton = (props) => {
  const {
    icon,
    onMouseEnter,
    onMouseLeave,
    children,
    onClick,
    trackerLabel,
    href,
    sameWindow
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
      sameWindow={sameWindow}
    >
      {children}
    </LabeledButtonLinked>
  );
};

export { LabeledButton, LabeledButtonForm }; // RoundButton
