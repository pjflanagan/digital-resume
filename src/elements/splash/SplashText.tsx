import clsx from 'clsx';
import React from 'react';

import { useScrambleText } from 'src/hooks';

import * as Style from './SplashText.module.scss';

type SplashTextProps = {
  className?: string;
  headline: React.ReactNode;
  blurb: string;
  style?: React.CSSProperties;
};

function AnimatedBlurb({
  className,
  children,
}: {
  className?: string;
  children: string;
}): React.ReactNode {
  const { ref, displayText } = useScrambleText<HTMLDivElement>({ text: children });
  return (
    <div ref={ref} className={className}>
      {displayText}
    </div>
  );
}

// SplashText: headline + scrambling mono blurb, used to open a page (landing, 404)
function SplashText({ className, headline, blurb, style }: SplashTextProps): React.ReactNode {
  return (
    <div className={clsx(Style.splashText, className)} style={style}>
      <div className={Style.headline}>{headline}</div>
      <AnimatedBlurb className={Style.blurb}>{blurb}</AnimatedBlurb>
    </div>
  );
}

export { SplashText };
