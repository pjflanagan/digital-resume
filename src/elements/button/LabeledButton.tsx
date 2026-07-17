import React from 'react';
import { SVGIcon } from 'src/elements';
import type { IconName } from '../icon/SVGIcon';

import * as Style from './Button.module.scss';
import clsx from 'clsx';

type LabeledButtonColor = 'yellow';

type LabeledButtonFormProps = {
  children?: React.ReactNode;
  icon: IconName;
  color?: LabeledButtonColor;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const LabeledButtonForm = ({
  children,
  icon,
  color,
  onMouseEnter,
  onMouseLeave,
}: LabeledButtonFormProps) => {
  return (
    <button
      className={clsx(Style.labeledButton, Style.buttonReset, color && Style[color])}
      type="submit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={Style.holder}>
        <div className={Style.svgHolder}>
          <SVGIcon icon={icon} />
        </div>
        <div className={Style.name}>{children}</div>
      </div>
    </button>
  );
};

type LabeledButtonLinkedProps = LabeledButtonFormProps & {
  className?: string;
  href: string;
  sameWindow?: boolean;
  // TODO: internal use Link from 'gatsby'
};

const LabeledButtonLinked = ({
  icon,
  color,
  onMouseEnter,
  onMouseLeave,
  children,
  className: classNameProp,
  href,
  sameWindow,
}: LabeledButtonLinkedProps) => {
  const rel = !sameWindow ? 'noreferrer' : undefined;
  const target = !sameWindow ? '_blank' : undefined;

  const className = clsx(Style.labeledButton, color && Style[color], classNameProp);

  return (
    <div className={className}>
      <a
        className={Style.holder}
        rel={rel}
        target={target}
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={Style.svgHolder}>
          <SVGIcon icon={icon} />
        </div>
        <div className={Style.name}>{children}</div>
      </a>
    </div>
  );
};

type LabeledButtonActionProps = {
  icon: IconName;
  children?: React.ReactNode;
  color?: LabeledButtonColor;
  onClick: () => void;
  className?: string;
};

const LabeledButtonAction = ({ icon, children, color, onClick, className }: LabeledButtonActionProps) => {
  return (
    <button
      type="button"
      className={clsx(Style.labeledButton, Style.buttonReset, color && Style[color], className)}
      onClick={onClick}
    >
      <div className={Style.holder}>
        <div className={Style.svgHolder}>
          <SVGIcon icon={icon} />
        </div>
        <div className={Style.name}>{children}</div>
      </div>
    </button>
  );
};

export { LabeledButtonAction, LabeledButtonLinked, LabeledButtonForm };
