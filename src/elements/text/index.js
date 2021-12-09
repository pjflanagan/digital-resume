import React from "react";

import { ParseTextForLinks } from "./parse-text-for-links";

import * as Style from "./style.module.scss";

// TextHeading h1
const TextHeading = (props) => {
  return (
    <h1 className={props.className}>
      {props.children}
    </h1>
  );
};

// TextSubHeading h2
const TextSubHeading = (props) => {
  return (
    <h2 className={props.className}>
      {props.children}
    </h2>
  );
};

// TextSectionHeading h3
const TextSectionHeading = (props) => {
  return (
    <h3 className={props.className}>
      {props.children}
    </h3>
  );
};

// TextAccent h4
const TextAccent = (props) => {
  return (
    <h4 className={props.className}>
      {props.children}
    </h4>
  );
};

// TextTag
const TextTag = ({ children }) => {
  return (
    <span className={Style.textTag}>{children}</span>
  );
}

// Text
const Text = (props) => {
  if (!!props.dangerouslySetInnerHTML)
    return (
      <p
        className={props.className}
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      />
    );
  return (
    <p className={props.className}>
      {ParseTextForLinks(props.children, props.links, props.callback)}
    </p>
  );
};

const TextPageCenter = ({ className, headline, blurb, style }) => (
  <div className={`${Style.textPageCenter} ${className}`} style={style}>
    <div className={Style.textHeadline}>{headline}</div>
    <div className={Style.textBlurb}>{blurb}</div>
  </div>
);

export { ParseTextForLinks } from "./parse-text-for-links";
export { TextType } from "./text-type";
export { TextInlineLink } from "./text-inline-link";
export { TextLinkedHeader } from "./text-linked-header";
export {
  TextAccent,
  TextHeading,
  TextSubHeading,
  TextSectionHeading,
  // TextFlag,
  TextPageCenter,
  Text,
  TextTag
};
