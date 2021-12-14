import classNames from 'classnames';
import React from 'react';

import { TextAccent, TextTag } from 'src/elements';

import * as Style from './style.module.scss';

const FormText = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  error
}) => {
  const className = classNames(Style.formField, {
    [Style.error]: !!error
  });
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
        className={className}
      />
      <div className={Style.errorHolder}>
        <TextTag>{error}</TextTag>
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
  const className = classNames(Style.formField, {
    [Style.error]: !!error
  })

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
        className={className}
        rows="4">
      </textarea>
      <div className={Style.errorHolder}>
        <TextTag>{error}</TextTag>
      </div>
    </div>
  );

};

export { FormText, FormMessage }