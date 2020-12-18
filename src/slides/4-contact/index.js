import React from "react";

import { LabeledButton, TextAccent, TextHeading, Text } from "../../elements";

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
            <Text>
              While I'm not currently seeking new opportunities, feel free to
              reach out. I'll try my best to phone back!
            </Text>
            <div className={Style.linkHolder}>
              <div className={Style.buttonHolder}>
                <LabeledButton
                  icon="email"
                  onMouseEnter={() => this.setContactOn(true)}
                  onMouseLeave={() => this.setContactOn(false)}
                >
                  Email
                </LabeledButton>
              </div>
              <div className={Style.buttonHolder}>
                <LabeledButton
                  icon="github"
                  onMouseEnter={() => this.setContactOn(true)}
                  onMouseLeave={() => this.setContactOn(false)}
                >
                  Github
                </LabeledButton>
              </div>
              <div className={Style.buttonHolder}>
                <LabeledButton
                  icon="linkedin"
                  onMouseEnter={() => this.setContactOn(true)}
                  onMouseLeave={() => this.setContactOn(false)}
                >
                  LinkedIn
                </LabeledButton>
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
