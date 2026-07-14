import clsx from 'clsx';
import { SVGIcon } from 'src/elements';
import type { IconName } from '../icon/SVGIcon';

import * as Style from './Button.module.scss';

type CircleButtonLinkedProps = {
  icon: IconName;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  href: string;
  sameWindow?: boolean;
};

const CircleButtonLinked = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  href,
  sameWindow,
}: CircleButtonLinkedProps) => {
  const rel = !sameWindow ? 'noreferrer' : undefined;
  const target = !sameWindow ? '_blank' : undefined;
  return (
    <a
      target={target}
      rel={rel}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SVGIcon icon={icon} />
    </a>
  );
};

type CircleButtonActionProps = {
  icon: IconName;
  onClick: () => void;
};

const CircleButtonAction = ({ icon, onClick }: CircleButtonActionProps) => {
  return (
    <button type="button" className={clsx(Style.circleButton, Style.buttonReset)} onClick={onClick}>
      <SVGIcon icon={icon} />
    </button>
  );
};

export { CircleButtonAction, CircleButtonLinked };
