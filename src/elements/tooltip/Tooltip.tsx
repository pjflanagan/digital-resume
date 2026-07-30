import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Glitch } from '../glitch/Glitch';

import * as Style from './Tooltip.module.scss';

// matches the glitch phase duration in Glitch.tsx, so exit has time to play before unmounting
const GLITCH_DURATION_MS = 180;

type TooltipProps = {
  text: string;
  children?: React.ReactNode;
};

function Tooltip({ text, children }: TooltipProps): React.ReactNode {
  const [isMounted, setIsMounted] = useState(false);
  const [glitchIndex, setGlitchIndex] = useState(0);
  const hideTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => () => clearTimeout(hideTimeout.current), []);

  const show = () => {
    clearTimeout(hideTimeout.current);
    setIsMounted(true);
    setGlitchIndex((prev) => prev + 1);
  };
  const hide = () => {
    setGlitchIndex((prev) => prev + 1);
    hideTimeout.current = setTimeout(() => setIsMounted(false), GLITCH_DURATION_MS);
  };

  return (
    <span
      className={Style.tooltip}
      tabIndex={0}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <span className={clsx(Style.tooltipBox, { [Style.visible]: isMounted })}>
        {isMounted && (
          <Glitch glitchIndex={glitchIndex} strength="medium">
            <span className={Style.tooltipInner}>{text}</span>
          </Glitch>
        )}
      </span>
    </span>
  );
}

export { Tooltip };
