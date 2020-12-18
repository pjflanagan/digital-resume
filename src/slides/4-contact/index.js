import React from "react";

import { LabeledButton, TextAccent, TextHeading } from "../../elements";

import { Wave } from "./wave";
import Style from "./style.module.scss";

class SlideContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactOn: false,
    };

    this.setContactOn = this.setContactOn.bind(this);
  }

  setContactOn(on) {
    this.setState({
      contactOn: on,
    });
  }

  render() {
    return (
      <div className={Style.slideContact}>
        <div className={Style.slideLeft}>
          <div className={Style.container}>
            <TextAccent>Let's make</TextAccent>
            <TextHeading>CONTACT!</TextHeading>
            <div class={Style.linkHolder}>
              <div className={Style.buttonHolder}>
                <LabeledButton
                  name="Email"
                  onMouseEnter={() => this.setContactOn(true)}
                  onMouseLeave={() => this.setContactOn(false)}
                />
              </div>
              <div className={Style.buttonHolder}>
                <LabeledButton
                  name="Github"
                  onMouseEnter={() => this.setContactOn(true)}
                  onMouseLeave={() => this.setContactOn(false)}
                />
              </div>
              <div className={Style.buttonHolder}>
                <LabeledButton
                  name="LinkedIn"
                  onMouseEnter={() => this.setContactOn(true)}
                  onMouseLeave={() => this.setContactOn(false)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={Style.slideRight}>
          <Wave on={this.state.contactOn} />
        </div>
      </div>
    );
  }
}

export { SlideContact };
