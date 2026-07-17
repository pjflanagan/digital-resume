import type { ReactNode } from 'react';
import clsx from 'clsx';
import { SVGIcon } from 'src/elements';
import { linkTargetProps } from 'src/helpers';
import type { IconName } from '../icon/SVGIcon';

import * as Style from './Button.module.scss';

type CircleButtonLinkedProps = {
  icon: IconName;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  href: string;
  sameWindow?: boolean;
  className?: string;
};

function CircleButtonLinked({
  icon,
  onMouseEnter,
  onMouseLeave,
  href,
  sameWindow,
  className,
}: CircleButtonLinkedProps): ReactNode {
  return (
    <a
      {...linkTargetProps(sameWindow)}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(Style.circleButton, Style.buttonReset, className)}
    >
      <SVGIcon icon={icon} />
    </a>
  );
}

type CircleButtonActionProps = {
  icon: IconName;
  onClick: () => void;
  className?: string;
};

function CircleButtonAction({ icon, onClick, className }: CircleButtonActionProps): ReactNode {
  return (
    <button
      type="button"
      className={clsx(Style.circleButton, Style.buttonReset, className)}
      onClick={onClick}
    >
      <SVGIcon icon={icon} />
    </button>
  );
}

export { CircleButtonAction, CircleButtonLinked };
