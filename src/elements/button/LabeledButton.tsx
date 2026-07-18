import React from 'react';
import { SVGIcon } from 'src/elements';
import { linkTargetProps } from 'src/helpers';
import type { IconName } from '../icon/SVGIcon';

import * as Style from './Button.module.scss';
import clsx from 'clsx';

type LabeledButtonColor = 'yellow' | 'red' | 'blue';

type LabeledButtonFormProps = {
  children?: React.ReactNode;
  icon: IconName;
  color?: LabeledButtonColor;
  bold?: boolean;
  scale?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function LabeledButtonForm({
  children,
  icon,
  color,
  bold,
  scale,
  onMouseEnter,
  onMouseLeave,
}: LabeledButtonFormProps): React.ReactNode {
  return (
    <button
      className={clsx(
        Style.labeledButton,
        Style.buttonReset,
        color && Style[color],
        bold && Style.bold
      )}
      style={scale ? { transform: `scale(${scale})` } : undefined}
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
}

type LabeledButtonLinkedProps = LabeledButtonFormProps & {
  className?: string;
  href: string;
  sameWindow?: boolean;
};

function LabeledButtonLinked({
  icon,
  color,
  bold,
  scale,
  onMouseEnter,
  onMouseLeave,
  children,
  className: classNameProp,
  href,
  sameWindow,
}: LabeledButtonLinkedProps): React.ReactNode {
  const className = clsx(
    Style.labeledButton,
    color && Style[color],
    bold && Style.bold,
    classNameProp
  );

  return (
    <div className={className} style={scale ? { transform: `scale(${scale})` } : undefined}>
      <a
        className={Style.holder}
        {...linkTargetProps(sameWindow)}
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
}

type LabeledButtonActionProps = {
  icon: IconName;
  children?: React.ReactNode;
  color?: LabeledButtonColor;
  bold?: boolean;
  scale?: number;
  onClick: () => void;
  className?: string;
};

function LabeledButtonAction({
  icon,
  children,
  color,
  bold,
  scale,
  onClick,
  className,
}: LabeledButtonActionProps): React.ReactNode {
  return (
    <button
      type="button"
      className={clsx(
        Style.labeledButton,
        Style.buttonReset,
        color && Style[color],
        bold && Style.bold,
        className
      )}
      style={scale ? { transform: `scale(${scale})` } : undefined}
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
}

export { LabeledButtonAction, LabeledButtonLinked, LabeledButtonForm };
