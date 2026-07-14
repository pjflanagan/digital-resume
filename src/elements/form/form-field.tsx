import classNames from 'classnames';
import React from 'react';

import { TextAccent, TextTag } from 'src/elements';

import * as Style from './style.module.scss';

type FormTextProps = {
  type?: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
};

const FormText = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  error
}: FormTextProps) => {
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

type FormMessageProps = {
  value: string;
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  error?: string;
};

const FormMessage = ({
  value,
  name,
  label,
  onChange,
  placeholder,
  error
}: FormMessageProps) => {
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
        rows={4}>
      </textarea>
      <div className={Style.errorHolder}>
        <TextTag>{error}</TextTag>
      </div>
    </div>
  );

};

export { FormText, FormMessage }
