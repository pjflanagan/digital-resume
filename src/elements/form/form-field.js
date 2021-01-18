import React from 'react';

import { TextAccent, TextLittle } from '../text';

import Style from './style.module.scss';

class FormText extends React.Component {
  render() {
    const {
      type,
      name,
      label,
      value,
      onChange,
      placeholder,
      error
    } = this.props;
    const className = !!error ? Style.error : '';
    return (
      <div>
        <div className={Style.labelHolder}>
          <TextAccent>{label}</TextAccent>
        </div>
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${Style.formField} ${className}`}
        />
        <div className={Style.errorHolder}>
          <TextLittle>{error}</TextLittle>
        </div>
      </div>
    );
  }
}

class FormMessage extends React.Component {
  render() {
    const {
      value,
      name,
      label,
      onChange,
      placeholder,
      error
    } = this.props;
    const className = !!error ? Style.error : '';
    return (
      <div>
        <div className={Style.labelHolder}>
          <TextAccent>{label}</TextAccent>
        </div>
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={`${Style.formField} ${className}`}
          rows="4">
        </textarea>
        <div className={Style.errorHolder}>
          <TextLittle>{error}</TextLittle>
        </div>
      </div>
    );
  }
};

export { FormText, FormMessage }