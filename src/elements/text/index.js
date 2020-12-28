import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import Style from "./style.module.scss";

// TextAccent
const TextAccent = (props) => {
  return (
    <p className={`${Style.textAccent} ${props.className}`}>{props.children}</p>
  );
};

// TextHeading
const TextHeading = (props) => {
  return (
    <h1 className={`${Style.textHeading} ${props.className}`}>
      {props.children}
    </h1>
  );
};

// TextSubHeading
const TextSubHeading = (props) => {
  return (
    <h2 className={`${Style.textSubHeading} ${props.className}`}>
      {props.children}
      <span className={Style.line}></span>
    </h2>
  );
};

// TextSubHeading2
const TextSubHeading2 = (props) => {
  return (
    <h2 className={`${Style.textSubHeading2} ${props.className}`}>
      {props.children}
    </h2>
  );
};

// TextFlag
const TextFlag = (props) => {
  return (
    <h2 className={`${Style.textFlag} ${props.className}`}>{props.children}</h2>
  );
};

// TextInlineLink
const TextInlineLink = ({
  href,
  className,
  onMouseOver,
  onFocus,
  children,
}) => {
  if (!href) {
    return (
      <span
        role="button"
        tabIndex={0}
        className={`${Style.textInlineLink} ${className}`}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
      >
        {children}
      </span>
    );
  }
  return (
    <OutboundLink
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${Style.textInlineLink} ${className}`}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
    >
      {children}
    </OutboundLink>
  );
};

// Text
const Text = (props) => {
  if (!!props.dangerouslySetInnerHTML)
    return (
      <p
        className={`${Style.text} ${props.className}`}
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      />
    );
  return <p className={`${Style.text} ${props.className}`}>{props.children}</p>;
};

// finds all instances of <link_name> in a string
const REGEX_MATCH_LINKS = /(.*?)<(.*?)>(.*?)/g;

const ParseTextForLinks = (text, links, callback) => {
  if(!links) {
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
    const onMouseOver = (!!callbackParam && !!callbackParam) ? () => callback(callbackParam) : undefined;
    const onFocus = (!!callbackParam && !!callbackParam) ? () => callback(callbackParam) : undefined;
    const href = (!!link) ? link : undefined;
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

export {
  TextAccent,
  TextHeading,
  TextSubHeading,
  TextSubHeading2,
  TextFlag,
  TextInlineLink,
  Text,
  ParseTextForLinks,
};
