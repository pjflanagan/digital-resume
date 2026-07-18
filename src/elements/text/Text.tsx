import React from 'react';
import clsx from 'clsx';

import { useScrambleText } from 'src/hooks';
import { activationKeyHandler } from 'src/helpers';

import type { ContentLink } from './types';

import { ParseTextForLinks, LinkCallback } from './ParseTextForLinks';

import * as Style from './Text.module.scss';

type MonoTextProps = {
  className?: string;
  // when true, renders in Ubuntu Mono
  mono?: boolean;
};

type HeadingProps = MonoTextProps & {
  children?: React.ReactNode;
  onClick?: () => void;
};

function makeHeading(Tag: 'h1' | 'h2' | 'h3' | 'h4'): React.FC<HeadingProps> {
  const Heading = ({ className, children, mono, onClick }: HeadingProps) => (
    <Tag
      className={clsx(className, mono && Style.mono)}
      onClick={onClick}
      {...(onClick && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: activationKeyHandler(onClick),
      })}
    >
      {children}
    </Tag>
  );
  Heading.displayName = `TextHeading(${Tag})`;
  return Heading;
}

const TextTitle = makeHeading('h1');
const TextSection = makeHeading('h2');
const TextHeading = makeHeading('h3');
const TextSubHeading = makeHeading('h4');

type TextAccentProps = HeadingProps & {
  // when true, renders as random numbers until scrolled into view, then settles to the real text
  animate?: boolean;
};

function AnimatedTextAccent({ className, children }: HeadingProps): React.ReactNode {
  const text = typeof children === 'string' ? children : '';
  const { ref, displayText } = useScrambleText<HTMLHeadingElement>({ text });
  return (
    <h5 ref={ref} className={className} style={{ whiteSpace: 'pre-line' }}>
      {displayText}
    </h5>
  );
}

function TextAccent({
  className,
  children,
  animate,
  mono = true,
}: TextAccentProps): React.ReactNode {
  const classNames = clsx(className, mono && Style.mono);
  if (animate) {
    return <AnimatedTextAccent className={classNames}>{children}</AnimatedTextAccent>;
  }
  return (
    <h5 className={classNames} style={{ whiteSpace: 'pre-line' }}>
      {children}
    </h5>
  );
}

function TextTag({
  children,
  mono,
}: {
  children?: React.ReactNode;
  mono?: boolean;
}): React.ReactNode {
  return <span className={clsx(Style.textTag, mono && Style.mono)}>{children}</span>;
}

type TextProps = MonoTextProps & {
  dangerouslySetInnerHTML?: { __html: string };
  style?: React.CSSProperties;
  children?: string;
  links?: ContentLink[];
  callback?: LinkCallback;
  onLinkClick?: (key: string) => void;
};

function Text({
  dangerouslySetInnerHTML,
  className,
  style,
  children,
  links,
  callback,
  onLinkClick,
  mono,
}: TextProps): React.ReactNode {
  const classNames = clsx(className, mono && Style.mono);
  if (dangerouslySetInnerHTML)
    return (
      <p className={classNames} style={style} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
    );
  return (
    <p className={classNames} style={style}>
      {ParseTextForLinks(children || '', links, callback, onLinkClick)}
    </p>
  );
}

export { ParseTextForLinks } from './ParseTextForLinks';
export type { LinkCallback } from './ParseTextForLinks';
export { TextInlineLink } from './TextInlineLink';
export { TextLinkedHeader } from './TextLinkedHeader';
export { TextAccent, TextTitle, TextSection, TextHeading, TextSubHeading, Text, TextTag };
