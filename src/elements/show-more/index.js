import React from "react";

import { LabeledButton } from "../button";

import Style from "./style.module.scss";

class ShowMore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { children, trackerLabel } = this.props;
    const { isOpen } = this.state;
    const icon = isOpen ? "less" : "more";
    const prompt = isOpen ? "Show less" : "Show more";
    const className = isOpen ? Style.open : '';
    return (
      <div className={`${Style.showMore} ${className}`}>
        <div className={Style.contentHolder}>{children}</div>
        <div className={Style.buttonHolder}>
          <LabeledButton
            onClick={this.toggle}
            icon={icon}
            trackerLabel={trackerLabel}
          >
            {prompt}
          </LabeledButton>
        </div>
      </div>
    );
  }
}

export { ShowMore };
