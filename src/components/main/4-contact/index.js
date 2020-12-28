import React from "react";

import { Main } from "../../../content";
import { LabeledButton, TextAccent, TextHeading, Text } from "../../../elements";

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
        <div className={Style.slideFront}>
          <div className={Style.container}>
            <TextAccent>{Main.contact.accent}</TextAccent>
            <TextHeading>{Main.contact.title}</TextHeading>
            <Text>{Main.contact.text}</Text>
            <div className={Style.linkHolder}>
              {Main.contact.links.map((link, i) => (
                <div
                  className={Style.buttonHolder}
                  key={i}
                >
                  <LabeledButton
                    icon={link.icon}
                    href={link.href}
                    onMouseEnter={() => this.setContactOn(true)}
                    onMouseLeave={() => this.setContactOn(false)}
                  >
                    {link.text}
                  </LabeledButton>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={Style.slideBack}>
          <Wave on={this.state.contactOn} />
        </div>
      </div>
    );
  }
}

export { SlideContact };