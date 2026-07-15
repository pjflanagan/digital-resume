import React from 'react';

import type { ContentLink } from './types';

import { TextInlineLink } from './TextInlineLink';

// matches <link_name> tokens; the capture keeps the name in the split output
const REGEX_SPLIT_LINKS = /<([^<>]+)>/g;

type LinkCallback = (link: Pick<ContentLink, 'image' | 'imageDescription' | 'greeting'>) => void;

const ParseTextForLinks = (
  text: string,
  links?: ContentLink[],
  callback?: LinkCallback
): React.ReactNode => {
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

    const { image, imageDescription, greeting, href, text: linkText } = link;
    const hasHoverEffect = image || greeting;
    const onHover =
      callback && hasHoverEffect ? () => callback({ image, imageDescription, greeting }) : undefined;

    return (
      <TextInlineLink key={i} href={href || undefined} onMouseOver={onHover} onFocus={onHover}>
        {linkText}
      </TextInlineLink>
    );
  });
};

export { ParseTextForLinks };
export type { LinkCallback };
