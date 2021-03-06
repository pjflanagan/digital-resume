import React from 'react';

import { TextAccent, TextLittle } from 'src/elements';

import Style from './style.module.scss';

const FormText = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  error
}) => {
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

const FormMessage = ({
  value,
  name,
  label,
  onChange,
  placeholder,
  error
}) => {
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

};

export { FormText, FormMessage }