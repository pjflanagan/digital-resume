import React from 'react';
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

import { LabeledButtonForm } from '../button/labeled-button';

import Style from './style.module.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    trackCustomEvent({
      category: "form",
      action: "submit",
      label: this.props.trackerLabel,
    });
    this.props.onSubmit();
  }

  render() {
    const {
      children,
      name,
      isLoading
    } = this.props;

    const className = isLoading ? Style.isLoading : "";

    return (
      <div className={Style.formContent}>
        <form
          onSubmit={this.onSubmit}
          className={`${Style.form} ${className}`}
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

const FormButton = ({
  prompt,
  icon,
  isSubmitted,
  promptSubmitted,
  iconSubmitted,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div className={Style.submitHolder}>
      <LabeledButtonForm
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        icon={isSubmitted ? iconSubmitted : icon}
      >
        {isSubmitted ? promptSubmitted : prompt}
      </LabeledButtonForm>
    </div>
  );
};

export { Form, FormButton }