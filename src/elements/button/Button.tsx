import React from 'react';

import { CircleButtonAction, CircleButtonLinked } from './CircleButton';
import { LabeledButtonAction, LabeledButtonLinked } from './LabeledButton';
import type { IconName } from '../icon/SVGIcon';

// TODO: button make width contain to prevent text wrap

type ButtonCommonProps = {
  icon: IconName;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

type ActionProps = ButtonCommonProps & {
  onClick: () => void;
};

type LinkedProps = ButtonCommonProps & {
  href: string;
  sameWindow?: boolean;
  className?: string;
};

type ButtonProps = ActionProps | LinkedProps;

const isAction = (props: ButtonProps): props is ActionProps => 'onClick' in props;

const LabeledButton = (props: ButtonProps) => {
  if (isAction(props)) {
    return <LabeledButtonAction {...props} />;
  }
  return <LabeledButtonLinked {...props} />;
};

const CircleButton = (props: ButtonProps) => {
  if (isAction(props)) {
    return <CircleButtonAction {...props} />;
  }
  return <CircleButtonLinked {...props} />;
};

export { LabeledButton, CircleButton };
export type { ActionProps, LinkedProps };
