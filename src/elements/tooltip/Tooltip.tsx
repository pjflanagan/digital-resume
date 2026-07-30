import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Glitch } from '../glitch/Glitch';

import { ReactComponent as ConnectorSvg } from './connector.svg';
import * as Style from './Tooltip.module.scss';

// matches the glitch phase duration in Glitch.tsx, so exit has time to play before unmounting
const GLITCH_DURATION_MS = 180;

type TooltipProps = {
  text: string;
  children?: React.ReactNode;
};

function Tooltip({ text, children }: TooltipProps): React.ReactNode {
  const [isMounted, setIsMounted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [glitchIndex, setGlitchIndex] = useState(0);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLSpanElement>(null);

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

  const handleMouseLeave = () => {
    if (!isPinned) hide();
  };
  const handleBlur = () => {
    if (!isPinned) hide();
  };
  const handleClick = () => {
    setIsPinned(true);
    show();
  };

  useEffect(() => {
    if (!isPinned) return undefined;

    const handleClickAway = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsPinned(false);
      hide();
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [isPinned]);

  return (
    <span
      ref={containerRef}
      className={Style.tooltip}
      tabIndex={0}
      onMouseEnter={show}
      onMouseLeave={handleMouseLeave}
      onFocus={show}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {children}
      <ConnectorSvg
        className={clsx(Style.connector, { [Style.visible]: isMounted })}
        aria-hidden="true"
      />
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
