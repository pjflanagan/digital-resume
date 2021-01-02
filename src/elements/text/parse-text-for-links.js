import React from "react";

import { TextInlineLink } from "./index";

// finds all instances of <link_name> in a string
const REGEX_MATCH_LINKS = /(.*?)<(.*?)>(.*?)/g;

const ParseTextForLinks = (text, links, callback) => {
  if (!links) {
    return <span>{text}</span>;
  }
  const matches = [...text.matchAll(REGEX_MATCH_LINKS)];
  // if there are no matches then return just as text
  if (matches.length === 0) {
    return <span>{text}</span>;
  }
  // otherwise we will return elements
  const elems = [];
  matches.forEach((match, i) => {
    // first push the normal text in match 1
    elems.push(<span key={`${i}-text`}>{match[1]}</span>);
    // then find the link we parsed in match 2
    const { callbackParam, href: link, text } = links.find(
      (l) => l.key === match[2]
    );
    // default the mouse over and href to undefined in case we aren't using them
    const onMouseOver =
      !!callbackParam && !!callbackParam
        ? () => callback(callbackParam)
        : undefined;
    const onFocus =
      !!callbackParam && !!callbackParam
        ? () => callback(callbackParam)
        : undefined;
    const href = !!link ? link : undefined;
    // push the link to the list
    elems.push(
      <TextInlineLink
        key={`${i}-link`}
        href={href}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
      >
        {text}
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
