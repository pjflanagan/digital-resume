import React from 'react';
import { LabeledButtonForm } from '../button/LabeledButton';
import type { IconName } from '../icon/SVGIcon';

import * as Style from './Form.module.scss';
import clsx from 'clsx';

type FormProps = {
  children?: React.ReactNode;
  name: string;
  isLoading?: boolean;
  onSubmit: () => void;
};

const Form = ({ children, name, isLoading, onSubmit: onSubmitProp }: FormProps) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProp();
  };

  const className = clsx(Style.form, {
    [Style.isLoading]: isLoading,
  });

  return (
    <div className={Style.formContent}>
      <form
        onSubmit={onSubmit}
        className={className}
        data-netlify-honeypot="bot-field"
        data-netlify="true"
        name={name}
      >
        <span>
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value={name} />
          {children}
        </span>
      </form>
    </div>
  );
};

type FormButtonProps = {
  prompt: string;
  icon: IconName;
  isSubmitted?: boolean;
  promptSubmitted?: string;
  iconSubmitted?: IconName;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const FormButton = ({
  prompt,
  icon,
  isSubmitted,
  promptSubmitted,
  iconSubmitted,
  onMouseEnter,
  onMouseLeave,
}: FormButtonProps) => {
  return (
    <div className={Style.submitHolder}>
      <LabeledButtonForm
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        icon={(isSubmitted ? iconSubmitted : icon) || icon}
      >
        {isSubmitted ? promptSubmitted : prompt}
      </LabeledButtonForm>
    </div>
  );
};

export { Form, FormButton };
