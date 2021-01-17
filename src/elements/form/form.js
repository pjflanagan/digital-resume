import React from 'react';

import { LabeledButtonForm } from '../button';

import Style from './style.module.scss';

class Form extends React.Component {
  render() {
    const {
      children
    } = this.props;
    return (
      <div className={Style.formContent}>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit();
        }} className={Style.form}>
          <span>
            {children}
          </span>
        </form>
      </div>
    );
  }
}

const FormButton = ({
  prompt,
  isSubmitted,
  promptSubmitted,
  onMouseEnter,
  onMouseLeave
}) => (
  <div className={Style.submitHolder}>
    <LabeledButtonForm
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isSubmitted ? promptSubmitted : prompt}
    </LabeledButtonForm>
  </div>
);

export { Form, FormButton }