import React from "react";

import { Main } from "../../../../content";
import {
  LabeledButton,
  TextAccent, TextHeading, Text,
  Form, FormText, FormMessage, FormButton
} from "../../../../elements";
import { encode } from "../../../../helpers";

import Style from "./style.module.scss";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const validate = ({ name, email, message }) => {
  const errorMessages = [];

  if (name.length === 0) {
    errorMessages.push({
      field: 'name',
      message: "Let me know your name."
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    errorMessages.push({
      field: 'email',
      message: "This email looks invalid."
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
    this.fetch = this.fetch.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.findError = this.findError.bind(this);
  }

  // on a field change
  onChange(e, field) {
    const errorMessages = this.state.errorMessages.filter(error => error.field !== field);
    this.setState({
      [e.target.name]: e.target.value,
      errorMessages
    });
  }

  // on form submit
  onSubmit() {
    const [isValid, errorMessages] = validate(this.state);
    if (!isValid) {
      this.error(errorMessages);
      return;
    }
    this.fetch();
  }

  // fetch resource
  fetch() {
    console.log("FETCH");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => this.success())
      .catch(error => this.error({
        field: "submit",
        message: error
      }));
  }

  // error
  error(errorMessages) {
    console.log("ERROR", errorMessages);
    console.log(this);
    this.setState({
      errorMessages: errorMessages,
    });
  }

  // when successful
  success() {
    console.log("SUCCESS");
    this.setState({
      errorMessages: [],
      name: "",
      email: "",
      message: "",
      isSubmitted: true
    });
  }

  // find error in error array
  findError(field) {
    const { errorMessages } = this.state;
    if (!errorMessages || errorMessages.length === 0) {
      return "";
    }
    const error = errorMessages.find(error => error.field === field);
    return !!error ? error.message : "";
  }

  render() {
    const {
      name,
      email,
      message,
      isSubmitted
    } = this.state;

    const className = isSubmitted ? Style.isSubmitted : "";

    return (
      <div className={`${Style.card} ${className}`}>
        <div className={Style.cardSides}>
          <div className={Style.sideLeft}>
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
            <Form
              onSubmit={this.onSubmit}
              error={this.findError('submit')} // TODO: this error goes at the bottom
              isSubmitted={isSubmitted} // TODO: change the success promt
            >
              <FormText
                placeholder="Name"
                type="name"
                name="name"
                value={name}
                error={this.findError('name')}
                onChange={(e) => this.onChange(e, 'name')}
              />
              <FormText
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                error={this.findError('email')}
                onChange={(e) => this.onChange(e, 'email')}
              />
              <FormMessage
                name="message"
                placeholder="Message"
                value={message}
                error={this.findError('message')}
                onChange={(e) => this.onChange(e, 'message')}
              />
              <FormButton
                isSubmitted={isSubmitted}
                prompt="Send"
                promptSubmitted="Sent"
                icon="send"
                iconSubmitted="check"
                onMouseEnter={() => this.props.setContactOnCallback(true)}
                onMouseLeave={() => this.props.setContactOnCallback(false)}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export { Card };
