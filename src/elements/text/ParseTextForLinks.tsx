import React from 'react';
import clsx from 'clsx';

import type { ContentLink } from './types';

import { TextInlineLink } from './TextInlineLink';

import * as Style from './Text.module.scss';

// matches <link_name> tokens; the capture keeps the name in the split output
const REGEX_SPLIT_LINKS = /<([^<>]+)>/g;

// wraps each word of text in its own span, so all but the first can be hidden below $md
// (see Style.wordHidden) — e.g. "Peter James Flanagan" reads as just "Peter" on small screens
function splitWords(text: string): React.ReactNode {
  const words = text.split(' ');
  return words.map((word, i) => (
    <React.Fragment key={i}>
      <span className={clsx(i > 0 && Style.wordHidden)}>{word}</span>
      {i < words.length - 1 ? ' ' : null}
    </React.Fragment>
  ));
}

type LinkCallback = (
  link: Pick<ContentLink, 'image' | 'photoLocation' | 'photoDescription' | 'greeting' | 'focusArea'>
) => void;

function ParseTextForLinks(
  text: string,
  links?: ContentLink[],
  callback?: LinkCallback,
  onLinkClick?: (key: string) => void
): React.ReactNode {
  // if there are no links then ignore
  if (!links) {
    return <span>{text}</span>;
  }

  // split into alternating [text, linkKey, text, linkKey, ..., text]
  const parts = text.split(REGEX_SPLIT_LINKS);
  if (parts.length === 1) {
    return <span>{text}</span>;
  }

  return parts.map((part, i) => {
    const isLinkKey = i % 2 === 1;
    const link = isLinkKey ? links.find((l) => l.key === part) : undefined;

    // plain text, or a key with no matching link (render it as-is)
    if (!link) {
      return <span key={i}>{part}</span>;
    }

    const {
      image,
      photoLocation,
      photoDescription,
      greeting,
      focusArea,
      href,
      key,
      text: linkText,
    } = link;
    const hasHoverEffect = image || greeting;
    const onHover =
      callback && hasHoverEffect
        ? () => callback({ image, photoLocation, photoDescription, greeting, focusArea })
        : undefined;
    const onClick = !href && onLinkClick ? () => onLinkClick(key) : undefined;

    return (
      <TextInlineLink
        key={i}
        href={href || undefined}
        onMouseOver={onHover}
        onFocus={onHover}
        onClick={onClick}
        className={href ? Style.external : undefined}
      >
        {linkText}
      </TextInlineLink>
    );
  });
}

export { ParseTextForLinks, splitWords };
export type { LinkCallback };
