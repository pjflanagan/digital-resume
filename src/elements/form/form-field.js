import React from 'react';

import Style from './style.module.scss';

class FormText extends React.Component {
  render() {
    const {
      type,
      value,
      onChange,
      placeholder,
      error
    } = this.props;
    const className = !!error ? Style.error : '';
    return (
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`${Style.formField} ${className}`}
      />
    );
  }
}

class FormMessage extends React.Component {
  render() {
    const {
      value,
      onChange,
      placeholder,
      error
    } = this.props;
    const className = !!error ? Style.error : '';
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${Style.formField} ${className}`}
        rows="4">
      </textarea>
    );
  }
};

export { FormText, FormMessage }