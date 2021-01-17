import React from "react";

import { Main } from "../../../../content";
import { LabeledButton, TextAccent, TextHeading, Text, Form, FormText, FormMessage } from "../../../../elements";

import Style from "./style.module.scss";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const ContactTitle = () => (
  <span>
    <TextAccent>{Main.contact.accent}</TextAccent>
    <TextHeading>{Main.contact.title}</TextHeading>
    <Text>{Main.contact.text}</Text>
  </span>
);

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessages: [],
      name: "",
      email: "",
      message: "",
      isSubmitted: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e, field) {
    const errorMessages = this.state.errorMessages.filter(error => error.field !== field);
    switch (field) {
      case "name":
        this.setState({ name: e.target.value, errorMessages });
        return;
      case "email":
        this.setState({ email: e.target.value, errorMessages });
        return;
      case "message":
        this.setState({ message: e.target.value, errorMessages });
        return;
      default:
        return;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // validate first
    const [isValid, errorMessages] = this.validate();
    console.log(isValid, errorMessages)
    if (!isValid) {
      // if this isn't valid then set error messages
      this.error(errorMessages);
      return;
    }
    this.success();
    // TODO: otherwise, do the submitting
  }

  validate() {
    const errorMessages = [];

    const { name, email, message } = this.state;

    if (name.length === 0) {
      errorMessages.push({
        field: 'name',
        message: "Let me know your name."
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      errorMessages.push({
        field: 'email',
        message: "This email looks invalid?"
      });
    }

    if (message.length === 0) {
      errorMessages.push({
        field: 'message',
        message: "Be sure to leave a note."
      });
    }

    return [
      errorMessages.length === 0,
      errorMessages
    ];
  }

  error(errorMessages) {
    this.setState({
      errorMessages: errorMessages,
    });
  }

  success() {
    this.setState({
      errorMessages: [],
      name: "",
      email: "",
      message: "",
      isSubmitted: true
    });
  }

  findError(field) {
    const error = this.state.errorMessages.find(error => error.field === field);
    return !!error ? error.message : "";
  }

  render() {
    const {
      errorMessages,
      name,
      email,
      message
    } = this.state;

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
            <Form onSubmit={(e) => this.onSubmit(e)} errorMessages={errorMessages}>
              <FormText placeholder="Name" type="name" value={name} error={this.findError('name')} onChange={(e) => this.onChange(e, 'name')} />
              <FormText placeholder="Email" type="email" value={email} error={this.findError('email')} onChange={(e) => this.onChange(e, 'email')} />
              <FormMessage placeholder="Message" value={message} error={this.findError('message')} onChange={(e) => this.onChange(e, 'message')} />
            </Form>
          </div>
        </div>
      </div >
    );
  }
}

export { Card };
