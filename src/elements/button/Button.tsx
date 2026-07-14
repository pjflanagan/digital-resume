import React from "react";

import { CircleButtonAction, CircleButtonLinked } from './CircleButton';
import { LabeledButtonAction, LabeledButtonLinked } from './LabeledButton';

// TODO: button make width contain to prevent text wrap

type ButtonCommonProps = {
  icon: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

type ActionProps = ButtonCommonProps & {
  onClick: () => void;
  children?: React.ReactNode;
};

type LinkedProps = ButtonCommonProps & {
  href: string;
  sameWindow?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonProps = Partial<ActionProps> & Partial<LinkedProps> & ButtonCommonProps;

const LabeledButton = (props: ButtonProps) => {
  if (props.onClick) {
    return <LabeledButtonAction {...(props as ActionProps)} />;
  }
  return <LabeledButtonLinked {...(props as LinkedProps)} />;
};

const CircleButton = (props: ButtonProps) => {
  if (props.onClick) {
    return <CircleButtonAction {...(props as ActionProps)} />;
  }
  return <CircleButtonLinked {...(props as LinkedProps)} />;
};

export { LabeledButton, CircleButton };
export type { ActionProps, LinkedProps };
