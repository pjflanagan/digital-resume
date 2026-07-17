import clsx from 'clsx';
import React from 'react';

import { TextAccent, TextTag } from 'src/elements';

import * as Style from './Form.module.scss';

type FormFieldWrapperProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function FormFieldWrapper({ label, error, children }: FormFieldWrapperProps): React.ReactNode {
  return (
    <div>
      <div className={Style.labelHolder}>
        <TextAccent>{label}</TextAccent>
      </div>
      {children}
      <div className={Style.errorHolder}>
        <TextTag>{error}</TextTag>
      </div>
    </div>
  );
}

function fieldClassName(error?: string): string {
  return clsx(Style.formField, {
    [Style.error]: !!error,
  });
}

type FormTextProps = {
  type?: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
};

function FormText({ type, name, label, value, onChange, placeholder, error }: FormTextProps): React.ReactNode {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        className={fieldClassName(error)}
      />
    </FormFieldWrapper>
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

function FormMessage({ value, name, label, onChange, placeholder, error }: FormMessageProps): React.ReactNode {
  return (
    <FormFieldWrapper label={label} error={error}>
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={fieldClassName(error)}
        rows={4}
      />
    </FormFieldWrapper>
  );
}

export { FormText, FormMessage };
