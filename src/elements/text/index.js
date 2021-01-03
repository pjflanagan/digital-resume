import React from "react";

import { ParseTextForLinks } from "./parse-text-for-links";
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

// Text
const Text = (props) => {
  if (!!props.dangerouslySetInnerHTML)
    return (
      <p
        className={`${Style.text} ${props.className}`}
        dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
      />
    );
  return (
    <p className={`${Style.text} ${props.className}`}>
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
  TextSubHeading2,
  TextFlag,
  TextPageCenter,
  Text,
};
