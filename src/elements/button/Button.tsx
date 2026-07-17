import React from 'react';

import { CircleButtonAction, CircleButtonLinked } from './CircleButton';
import { LabeledButtonAction, LabeledButtonLinked } from './LabeledButton';
import type { IconName } from '../icon/SVGIcon';

type ButtonCommonProps = {
  icon: IconName;
  children?: React.ReactNode;
  color?: 'yellow';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
};

type ActionProps = ButtonCommonProps & {
  onClick: () => void;
};

type LinkedProps = ButtonCommonProps & {
  href: string;
  sameWindow?: boolean;
};

type ButtonProps = ActionProps | LinkedProps;

function isAction(props: ButtonProps): props is ActionProps {
  return 'onClick' in props;
}

function LabeledButton(props: ButtonProps): React.ReactNode {
  if (isAction(props)) {
    return <LabeledButtonAction {...props} />;
  }
  return <LabeledButtonLinked {...props} />;
}

function CircleButton(props: ButtonProps): React.ReactNode {
  if (isAction(props)) {
    return <CircleButtonAction {...props} />;
  }
  return <CircleButtonLinked {...props} />;
}

export { LabeledButton, CircleButton };
export type { ActionProps, LinkedProps };
