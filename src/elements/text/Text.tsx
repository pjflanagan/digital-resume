import React from 'react';
import clsx from 'clsx';

import { useScrambleText } from 'src/hooks';

import type { ContentLink } from './types';

import { ParseTextForLinks, LinkCallback } from './ParseTextForLinks';

import * as Style from './Text.module.scss';

type HeadingProps = {
  className?: string;
  children?: React.ReactNode;
  // when true, renders in Ubuntu Mono
  mono?: boolean;
  onClick?: () => void;
};

const makeHeading = (Tag: 'h1' | 'h2' | 'h3' | 'h4') => {
  const Heading = ({ className, children, mono, onClick }: HeadingProps) => (
    <Tag className={clsx(className, mono && Style.mono)} onClick={onClick}>
      {children}
    </Tag>
  );
  Heading.displayName = `TextHeading(${Tag})`;
  return Heading;
};

const TextTitle = makeHeading('h1');
const TextSection = makeHeading('h2');
const TextHeading = makeHeading('h3');
const TextSubHeading = makeHeading('h4');

type TextAccentProps = HeadingProps & {
  // when true, renders as random numbers until scrolled into view, then settles to the real text
  animate?: boolean;
};

const AnimatedTextAccent = ({ className, children }: HeadingProps) => {
  const text = typeof children === 'string' ? children : '';
  const { ref, displayText } = useScrambleText<HTMLHeadingElement>({ text });
  return (
    <h5 ref={ref} className={className} style={{ whiteSpace: 'pre-line' }}>
      {displayText}
    </h5>
  );
};

// TextAccent h5
const TextAccent = ({ className, children, animate, mono = true }: TextAccentProps) => {
  const classNames = clsx(className, mono && Style.mono);
  if (animate) {
    return <AnimatedTextAccent className={classNames}>{children}</AnimatedTextAccent>;
  }
  return (
    <h5 className={classNames} style={{ whiteSpace: 'pre-line' }}>
      {children}
    </h5>
  );
};

// TextTag
const TextTag = ({ children, mono }: { children?: React.ReactNode; mono?: boolean }) => (
  <span className={clsx(Style.textTag, mono && Style.mono)}>{children}</span>
);

type TextProps = {
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  children?: string;
  links?: ContentLink[];
  callback?: LinkCallback;
  mono?: boolean;
};

// Text
const Text = ({
  dangerouslySetInnerHTML,
  className,
  children,
  links,
  callback,
  mono,
}: TextProps) => {
  const classNames = clsx(className, mono && Style.mono);
  if (dangerouslySetInnerHTML)
    return <p className={classNames} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  return <p className={classNames}>{ParseTextForLinks(children || '', links, callback)}</p>;
};

type TextPageCenterProps = {
  className?: string;
  headline: React.ReactNode;
  blurb: string;
  style?: React.CSSProperties;
  // when true, renders the blurb in Ubuntu Mono
  mono?: boolean;
  // when true, scrambles the blurb until scrolled into view
  animate?: boolean;
};

const AnimatedBlurb = ({ className, children }: { className?: string; children: string }) => {
  const { ref, displayText } = useScrambleText<HTMLDivElement>({ text: children });
  return (
    <div ref={ref} className={className}>
      {displayText}
    </div>
  );
};

const TextPageCenter = ({
  className: classNameProp,
  headline,
  blurb,
  style,
  mono,
  animate,
}: TextPageCenterProps) => {
  const blurbClassName = clsx(Style.textBlurb, mono && Style.mono);
  return (
    <div className={clsx(Style.textPageCenter, classNameProp)} style={style}>
      <div className={Style.textHeadline}>{headline}</div>
      {animate ? (
        <AnimatedBlurb className={blurbClassName}>{blurb}</AnimatedBlurb>
      ) : (
        <div className={blurbClassName}>{blurb}</div>
      )}
    </div>
  );
};

export { ParseTextForLinks } from './ParseTextForLinks';
export type { LinkCallback } from './ParseTextForLinks';
export { TextInlineLink } from './TextInlineLink';
export { TextLinkedHeader } from './TextLinkedHeader';
export {
  TextAccent,
  TextTitle,
  TextSection,
  TextHeading,
  TextSubHeading,
  TextPageCenter,
  Text,
  TextTag,
};
