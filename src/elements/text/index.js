import React from "react";

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
    <h2 className={`${Style.textFlag} ${props.className}`}>
      {props.children}
    </h2>
  );
};

// TextInlineLink
const TextInlineLink = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={`${Style.textInlineLink} ${props.className}`}
    >
      {props.children}
    </a>
  );
};

// Text
const Text = (props) => {
  if (!!props.dangerouslySetInnerHTML)
    return (
      <p className={`${Style.text} ${props.className}`} dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} />
    )
  return (
    <p className={`${Style.text} ${props.className}`}>{props.children}</p>
  );
};

export {
  TextAccent,
  TextHeading,
  TextSubHeading,
  TextSubHeading2,
  TextFlag,
  TextInlineLink,
  Text,
};