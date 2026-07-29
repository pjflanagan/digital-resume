import React from 'react';
import clsx from 'clsx';

import { useScrambleText } from 'src/hooks';
import { activationKeyHandler } from 'src/helpers';

import type { ContentLink } from './types';

import { ParseTextForLinks, LinkCallback, LinkClickCallback } from './ParseTextForLinks';

import * as Style from './Text.module.scss';

type MonoTextProps = {
  // when true, renders in Ubuntu Mono
  mono?: boolean;
  // a themed tag (h1-h5, p) sets its own padding/color directly, so a caller-owned
  // wrapper can only add to that box, never replace it; this stays a composition
  // seam like ButtonHolder's className, for the cases that need to override it
  className?: string;
};

type HeadingProps = MonoTextProps & {
  children?: React.ReactNode;
  onClick?: () => void;
  // overrides the tag's default themed color, e.g. h3's default yellow
  color?: 'cyan';
};

function makeHeading(Tag: 'h1' | 'h2' | 'h3' | 'h4'): React.FC<HeadingProps> {
  const Heading = ({ children, mono, onClick, color, className }: HeadingProps) => (
    <Tag
      className={clsx(
        className,
        mono && Style.mono,
        onClick && Style.clickable,
        color && Style[color]
      )}
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

function AnimatedTextAccent({ children, mono, className, color }: HeadingProps): React.ReactNode {
  const text = typeof children === 'string' ? children : '';
  const { ref, displayText } = useScrambleText<HTMLHeadingElement>({ text });
  return (
    <h5
      ref={ref}
      className={clsx(className, mono && Style.mono, color && Style[color])}
      style={{ whiteSpace: 'pre-line' }}
    >
      {displayText}
    </h5>
  );
}

function TextAccent({
  children,
  animate,
  mono = true,
  className,
  color,
}: TextAccentProps): React.ReactNode {
  if (animate) {
    return (
      <AnimatedTextAccent mono={mono} className={className} color={color}>
        {children}
      </AnimatedTextAccent>
    );
  }
  return (
    <h5
      className={clsx(className, mono && Style.mono, color && Style[color])}
      style={{ whiteSpace: 'pre-line' }}
    >
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
  children?: string;
  links?: ContentLink[];
  callback?: LinkCallback;
  onLinkClick?: LinkClickCallback;
};

function Text({
  dangerouslySetInnerHTML,
  children,
  links,
  callback,
  onLinkClick,
  mono,
  className: classNameProp,
}: TextProps): React.ReactNode {
  const className = clsx(classNameProp, mono && Style.mono);
  if (dangerouslySetInnerHTML)
    return <p className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  return (
    <p className={className}>{ParseTextForLinks(children || '', links, callback, onLinkClick)}</p>
  );
}

export { ParseTextForLinks, splitWords } from './ParseTextForLinks';
export type { LinkCallback, LinkClickCallback } from './ParseTextForLinks';
export { TextInlineLink } from './TextInlineLink';
export { TextLinkedHeader } from './TextLinkedHeader';
export { TextAccent, TextTitle, TextSection, TextHeading, TextSubHeading, Text, TextTag };
