import type { ReactNode } from 'react';
import type { IconBaseProps } from 'react-icons';
import { ReactComponent as SendArrowSvg } from './send-arrow.svg';

function SendArrowIcon({ size = '1em', ...props }: IconBaseProps): ReactNode {
  return <SendArrowSvg width={size} height={size} {...props} />;
}

export { SendArrowIcon };
