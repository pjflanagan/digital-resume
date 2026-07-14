import React from "react";
import { SVGIcon } from "src/elements";

import * as Style from "./Button.module.scss";

type CircleButtonLinkedProps = {
  icon: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  href: string;
  sameWindow?: boolean;
};

const CircleButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  href,
  sameWindow,
}: CircleButtonLinkedProps) => {
  const rel = !sameWindow ? "noreferrer" : undefined;
  const target = !sameWindow ? "_blank" : undefined;
  return (
    <a
      target={target}
      rel={rel}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SVGIcon icon={icon} />
    </a>
  );
};

type CircleButtonActionProps = {
  icon: string;
  onClick: () => void;
};

class CircleButtonAction extends React.Component<CircleButtonActionProps> {
  constructor(props: CircleButtonActionProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e: React.SyntheticEvent) {
    e.preventDefault();
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
