import React from "react";
import classNames from "classnames";

import { ParseTextForLinks } from "./parse-text-for-links";

import * as Style from "./style.module.scss";

// TextTitle h1
const TextTitle = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
);

// TextSection h2
const TextSection = ({ className, children }) => (
  <h2 className={className}>{children}</h2>
);


// TextHeading h3
const TextHeading = ({ className, children }) => (
  <h3 className={className}>{children}</h3>
);


// TextSubHeading h4
const TextSubHeading = ({ className, children }) => (
  <h4 className={className}>{children}</h4>
);

// TextAccent h5
const TextAccent = ({ className, children }) => (
  <h5 className={className}>{children}</h5>
);


// TextTag
const TextTag = ({ children }) => (
  <span className={Style.textTag}>{children}</span>
);


// Text
const Text = ({
  dangerouslySetInnerHTML,
  className,
  children,
  links,
  callback
}) => {
  if (!!dangerouslySetInnerHTML)
    return (
      <p
        className={className}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  return (
    <p className={className}>
      {ParseTextForLinks(children, links, callback)}
    </p>
  );
};

const TextPageCenter = ({
  className: classNameProp,
  headline,
  blurb,
  style
}) => (
  <div className={classNames(Style.textPageCenter, classNameProp)} style={style}>
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
