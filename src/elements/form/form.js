import React from 'react';

import { FormButton } from '../button';

import Style from './style.module.scss';

class Form extends React.Component {
  render() {
    const { children, onSubmit } = this.props;
    return (
      <div className={Style.formContent}>
        <form onSubmit={onSubmit} className={Style.form}>
          <span>
            {children}
          </span>
          <div className={Style.submitHolder}>
            <FormButton>Send</FormButton>
          </div>
        </form>
      </div>
    );
  }
}

export { Form }