import React from 'react';
import { LabeledButtonForm } from '../button/labeled-button';

import * as Style from './style.module.scss';
import classNames from 'classnames';

type FormProps = {
  children?: React.ReactNode;
  name: string;
  isLoading?: boolean;
  onSubmit: () => void;
};

class Form extends React.Component<FormProps> {
  constructor(props: FormProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const {
      children,
      name,
      isLoading
    } = this.props;

    const className = classNames(Style.form, {
      [Style.isLoading]: isLoading
    });

    return (
      <div className={Style.formContent}>
        <form
          onSubmit={this.onSubmit}
          className={className}
          netlify-honeypot="bot-field"
          data-netlify="true"
          name={name}>
          <span>
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value={name} />
            {children}
          </span>
        </form>
      </div>
    );
  }
}

type FormButtonProps = {
  prompt: string;
  icon: string;
  isSubmitted?: boolean;
  promptSubmitted?: string;
  iconSubmitted?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const FormButton = ({
  prompt,
  icon,
  isSubmitted,
  promptSubmitted,
  iconSubmitted,
  onMouseEnter,
  onMouseLeave,
}: FormButtonProps) => {
  return (
    <div className={Style.submitHolder}>
      <LabeledButtonForm
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        icon={(isSubmitted ? iconSubmitted : icon) || icon}
      >
        {isSubmitted ? promptSubmitted : prompt}
      </LabeledButtonForm>
    </div>
  );
};

export { Form, FormButton }
