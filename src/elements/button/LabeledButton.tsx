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
  expand?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function LabeledButtonForm({
  children,
  icon,
  color,
  bold,
  scale,
  expand,
  onMouseEnter,
  onMouseLeave,
}: LabeledButtonFormProps): React.ReactNode {
  return (
    <button
      className={clsx(
        Style.labeledButton,
        Style.buttonReset,
        color && Style[color],
        bold && Style.bold,
        expand && Style.expand
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
  href: string;
  sameWindow?: boolean;
};

function LabeledButtonLinked({
  icon,
  color,
  bold,
  scale,
  expand,
  onMouseEnter,
  onMouseLeave,
  children,
  href,
  sameWindow,
}: LabeledButtonLinkedProps): React.ReactNode {
  const className = clsx(
    Style.labeledButton,
    color && Style[color],
    bold && Style.bold,
    expand && Style.expand
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
  expand?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function LabeledButtonAction({
  icon,
  children,
  color,
  bold,
  scale,
  expand,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: LabeledButtonActionProps): React.ReactNode {
  return (
    <button
      type="button"
      className={clsx(
        Style.labeledButton,
        Style.buttonReset,
        color && Style[color],
        bold && Style.bold,
        expand && Style.expand
      )}
      style={scale ? { transform: `scale(${scale})` } : undefined}
      onClick={onClick}
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

export { LabeledButtonAction, LabeledButtonLinked, LabeledButtonForm };
