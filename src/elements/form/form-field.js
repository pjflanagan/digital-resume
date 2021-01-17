import React from 'react';

import { TextAccent } from '../text';

import Style from './style.module.scss';

class FormText extends React.Component {
  render() {
    const {
      type,
      name,
      value,
      onChange,
      placeholder,
      error
    } = this.props;
    const className = !!error ? Style.error : '';
    return (
      <div>
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${Style.formField} ${className}`}
        />
        <div className={Style.errorHolder}>
          <TextAccent>{error}</TextAccent>
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
      onChange,
      placeholder,
      error
    } = this.props;
    const className = !!error ? Style.error : '';
    return (
      <div>
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={`${Style.formField} ${className}`}
          rows="4">
        </textarea>
        <div className={Style.errorHolder}>
          <TextAccent>{error}</TextAccent>
        </div>
      </div>
    );
  }
};

export { FormText, FormMessage }