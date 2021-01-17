import React from 'react';

import { FormButton } from '../button';

import Style from './style.module.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const {
      children,
      prompt,
      isSubmitted,
      promptSubmitted,
    } = this.props;
    return (
      <div className={Style.formContent}>
        <form onSubmit={this.onSubmit} className={Style.form}>
          <span>
            {children}
          </span>
          <div className={Style.submitHolder}>
            <FormButton>{isSubmitted ? promptSubmitted : prompt}</FormButton>
          </div>
        </form>
      </div>
    );
  }
}

export { Form }