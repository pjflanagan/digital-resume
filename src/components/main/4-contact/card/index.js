import React from "react";

import { Main } from "../../../../content";
import { LabeledButton, TextAccent, TextHeading, Text, Form, FormEmail, FormMessage, FormName } from "../../../../elements";

import Style from "./style.module.scss";

const ContactTitle = () => (
  <span>
    <TextAccent>{Main.contact.accent}</TextAccent>
    <TextHeading>{Main.contact.title}</TextHeading>
    <Text>{Main.contact.text}</Text>
  </span>
);

class Card extends React.Component {
  render() {
    return (
      <div className={Style.card}>
        <ContactTitle />
        <div className={Style.cardSides}>
          <div className={Style.sideLeft}>
            {/* <ContactTitle /> */}
            <div className={Style.linkHolder}>
              {Main.contact.links.map((link, i) => (
                <div
                  className={Style.buttonHolder}
                  key={i}
                >
                  <LabeledButton
                    icon={link.icon}
                    href={link.href}
                    onMouseEnter={() => this.props.setContactOnCallback(true)}
                    onMouseLeave={() => this.props.setContactOnCallback(false)}
                  >
                    {link.text}
                  </LabeledButton>
                </div>
              ))}
            </div>
          </div>
          <div className={Style.sideRight}>
            <Form successCallback={() => { }}>
              <FormName />
              <FormEmail />
              <FormMessage />
            </Form>
          </div>
        </div>
      </div >
    );
  }
}

export { Card };
