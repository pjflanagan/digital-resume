import clsx from "clsx";
import React from "react";

import { Bio } from "src/content";
import type { FormPlaceholder } from "src/content";
import {
  LabeledButton,
  TextAccent, TextTitle, Text,
  Form, FormText, FormMessage, FormButton
} from "src/elements";
import { encode } from "src/helpers";

import * as Style from "./Card.module.scss";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

type FieldError = {
  field: string;
  message: string;
};

type FormFields = {
  name: string;
  email: string;
  message: string;
};

const validate = ({ name, email, message }: FormFields): [boolean, FieldError[]] => {
  const errorMessages: FieldError[] = [];

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
};

const pickPlaceholder = (): FormPlaceholder => {
  return Bio.contact.formPlaceholders[Math.floor(Math.random() * Bio.contact.formPlaceholders.length)];
};

type CardProps = {
  setIsWaveOn: (on: boolean) => void;
  isOpen: boolean;
};

type CardState = FormFields & {
  errorMessages: FieldError[];
  isLoading: boolean;
  isSubmitted: boolean;
  placeholders: FormPlaceholder;
};

class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {
      errorMessages: [],
      name: "",
      email: "",
      message: "",
      isLoading: false,
      isSubmitted: false,
      placeholders: pickPlaceholder()
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetch = this.fetch.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.findError = this.findError.bind(this);
  }

  // on a field change
  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) {
    const errorMessages = this.state.errorMessages.filter(error => error.field !== field);
    this.setState({
      [e.target.name]: e.target.value,
      errorMessages
    } as unknown as CardState);
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
    const { name, email, message } = this.state;
    this.setState({
      isLoading: true
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", name, email, message })
    })
      .then(() => this.success())
      .catch(error => this.error([{
        field: "submit",
        message: String(error)
      }]));
  }

  // error
  error(errorMessages: FieldError[]) {
    this.setState({
      isLoading: false,
      errorMessages: errorMessages,
    });
  }

  // when successful
  success() {
    this.setState({
      errorMessages: [],
      name: "",
      email: "",
      message: "",
      placeholders: {
        name: "",
        email: "",
        message: "",
      }
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        isSubmitted: true
      });
    }, 600);
  }

  // find error in error array
  findError(field: string): string {
    const { errorMessages } = this.state;
    if (!errorMessages || errorMessages.length === 0) {
      return "";
    }
    const error = errorMessages.find(error => error.field === field);
    return error ? error.message : "";
  }

  render() {
    const {
      name,
      email,
      message,
      isSubmitted,
      isLoading,
      placeholders
    } = this.state;
    const { setIsWaveOn, isOpen } = this.props;

    const className = clsx(Style.card, {
      [Style.isSubmitted]: isSubmitted || !isOpen
    });

    return (
      <div className={className}>
        <div className={Style.cardSides}>
          <div className={Style.sideLeft}>
            <TextAccent>{Bio.contact.accent}</TextAccent>
            <TextTitle>{Bio.contact.title}</TextTitle>
            <Text>{Bio.contact.text}</Text>
            <div className={Style.linkHolder}>
              {Bio.contact.links.map((link, i) => (
                <div
                  className={Style.buttonHolder}
                  key={i}
                >
                  <LabeledButton
                    icon={link.icon}
                    href={link.href}
                    onMouseEnter={() => setIsWaveOn(true)}
                    onMouseLeave={() => setIsWaveOn(false)}
                  >
                    {link.text}
                  </LabeledButton>
                </div>
              ))}
            </div>
          </div>
          <div className={Style.sideRight}>
            {/* TODO: the submit error (findError('submit')) should render at the bottom of the form */}
            <Form
              onSubmit={this.onSubmit}
              name="contact"
              isLoading={isLoading}
            >
              <FormText
                label="Name"
                placeholder={placeholders.name}
                type="name"
                name="name"
                value={name}
                error={this.findError('name')}
                onChange={(e) => this.onChange(e, 'name')}
              />
              <FormText
                label="Email"
                placeholder={placeholders.email}
                type="email"
                name="email"
                value={email}
                error={this.findError('email')}
                onChange={(e) => this.onChange(e, 'email')}
              />
              <FormMessage
                label="Message"
                name="message"
                placeholder={placeholders.message}
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
                onMouseEnter={() => setIsWaveOn(true)}
                onMouseLeave={() => setIsWaveOn(false)}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export { Card };
