import React from "react";

import type { ContentLink } from "src/content/types";

import { TextInlineLink } from "./TextInlineLink";

// finds all instances of <link_name> in a string
const REGEX_MATCH_LINKS = /(.*?)<(.*?)>(.*?)/g;

type LinkCallback = (callbackParam: ContentLink['callbackParam']) => void;

const ParseTextForLinks = (
  text: string,
  links?: ContentLink[],
  callback?: LinkCallback
): React.ReactNode => {
  // if there are no links then ignore
  if (!links) {
    return <span>{text}</span>;
  }

  // attempt to match all the links
  const matches = [...text.matchAll(REGEX_MATCH_LINKS)];
  // if there are no matches then return just as text
  if (matches.length === 0) {
    return <span>{text}</span>;
  }

  // otherwise we will return elements
  const elems: React.ReactNode[] = [];
  matches.forEach((match, i) => {
    // first push the normal text in match 1
    elems.push(<span key={`${i}-text`}>{match[1]}</span>);

    // then find the link we parsed in match 2
    const link = links.find((l) => l.key === match[2]);
    if (!link) {
      return;
    }
    const { callbackParam, href, text: linkText } = link;

    // default the mouse over and href to undefined in case we aren't using them
    const onMouseOver =
      !!callback && !!callbackParam
        ? () => callback(callbackParam)
        : undefined;
    const onFocus =
      !!callback && !!callbackParam
        ? () => callback(callbackParam)
        : undefined;

    // push the link to the list
    elems.push(
      <TextInlineLink
        key={`${i}-link`}
        href={href || undefined}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
      >
        {linkText}
      </TextInlineLink>
    );
  });

  // push the last bit of unmatched text
  elems.push(
    <span key={matches.length}>{text.substr(text.lastIndexOf(">") + 1)}</span>
  );

  return elems;
};

export { ParseTextForLinks };
export type { LinkCallback };
