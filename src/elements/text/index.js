import React from "react";

import { ParseTextForLinks } from "./parse-text-for-links";

import * as Style from "./style.module.scss";

// TextTitle h1
const TextTitle = (props) => {
  return (
    <h1 className={props.className}>
      {props.children}
    </h1>
  );
};

// TextSection h2
const TextSection = (props) => {
  return (
    <h2 className={props.className}>
      {props.children}
    </h2>
  );
};

// TextHeading h3
const TextHeading = (props) => {
  return (
    <h3 className={props.className}>
      {props.children}
    </h3>
  );
};

// TextSubHeading h4
const TextSubHeading = (props) => {
  return (
    <h4 className={props.className}>
      {props.children}
    </h4>
  );
};

// TextAccent h5
const TextAccent = (props) => {
  return (
    <h5 className={props.className}>
      {props.children}
    </h5>
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
  TextTitle,
  TextSection,
  TextHeading,
  TextSubHeading,
  TextPageCenter,
  Text,
  TextTag
};
