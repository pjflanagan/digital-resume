import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useBio } from 'src/content';
import type { FormPlaceholder } from 'src/content';
import {
  LabeledButton,
  TextAccent,
  TextTitle,
  Text,
  Form,
  FormText,
  FormMessage,
  FormButton,
  TextTag,
} from 'src/elements';
import { encode, Random } from 'src/helpers';

import * as Style from './Card.module.scss';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

type FormField = 'name' | 'email' | 'message';

type FieldError = {
  field: FormField | 'submit';
  message: string;
};

type FormFields = Record<FormField, string>;

const EMPTY_FIELDS: FormFields = { name: '', email: '', message: '' };

const validate = ({ name, email, message }: FormFields): FieldError[] => {
  const errorMessages: FieldError[] = [];

  if (name.length === 0) {
    errorMessages.push({
      field: 'name',
      message: 'Let me know your name.',
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    errorMessages.push({
      field: 'email',
      message: 'This email looks invalid.',
    });
  }

  if (message.length === 0) {
    errorMessages.push({
      field: 'message',
      message: 'Be sure to leave a note.',
    });
  }

  return errorMessages;
};

type CardProps = {
  setIsWaveOn: (on: boolean) => void;
  isOpen: boolean;
};

const Card = ({ setIsWaveOn, isOpen }: CardProps) => {
  const Bio = useBio();
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [errorMessages, setErrorMessages] = useState<FieldError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placeholders, setPlaceholders] = useState<FormPlaceholder>(() =>
    Random.fromArray(Bio.contact.formPlaceholders)
  );
  const submitTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(submitTimeout.current), []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: FormField
  ) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    setErrorMessages((prev) => prev.filter((error) => error.field !== field));
  };

  const error = (messages: FieldError[]) => {
    setIsLoading(false);
    setErrorMessages(messages);
  };

  const success = () => {
    setErrorMessages([]);
    setFields(EMPTY_FIELDS);
    setPlaceholders({ name: '', email: '', message: '' });
    submitTimeout.current = setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const submitForm = () => {
    setIsLoading(true);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...fields }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        success();
      })
      .catch((err) =>
        error([
          {
            field: 'submit',
            message: String(err),
          },
        ])
      );
  };

  const onSubmit = () => {
    const validationErrors = validate(fields);
    if (validationErrors.length > 0) {
      error(validationErrors);
      return;
    }
    submitForm();
  };

  const findError = (field: FieldError['field']): string =>
    errorMessages.find((error) => error.field === field)?.message ?? '';

  const cycleCharacter = () => {
    const others = Bio.contact.formPlaceholders.filter(
      (placeholder) => placeholder.name !== placeholders.name
    );
    setPlaceholders(Random.fromArray(others));
  };

  const className = clsx(Style.card, {
    [Style.isSubmitted]: isSubmitted || !isOpen,
  });

  const submitError = findError('submit');

  return (
    <div className={className}>
      <div className={Style.cardSides}>
        <div className={Style.sideLeft}>
          <TextAccent mono animate>
            {Bio.contact.accent}
          </TextAccent>
          <TextTitle className={Style.title} onClick={cycleCharacter}>
            {Bio.contact.title}
          </TextTitle>
          <Text>{Bio.contact.text}</Text>
          <div className={Style.linkHolder}>
            {Bio.contact.links.map((link) => (
              <div className={Style.buttonHolder} key={link.text}>
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
          <Form onSubmit={onSubmit} name="contact" isLoading={isLoading}>
            <FormText
              label="Name"
              placeholder={placeholders.name}
              type="name"
              name="name"
              value={fields.name}
              error={findError('name')}
              onChange={(e) => onChange(e, 'name')}
            />
            <FormText
              label="Email"
              placeholder={placeholders.email}
              type="email"
              name="email"
              value={fields.email}
              error={findError('email')}
              onChange={(e) => onChange(e, 'email')}
            />
            <FormMessage
              label="Message"
              name="message"
              placeholder={placeholders.message}
              value={fields.message}
              error={findError('message')}
              onChange={(e) => onChange(e, 'message')}
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
            {!!submitError && (
              <div className={Style.submitError}>
                <TextTag>{submitError}</TextTag>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export { Card };
