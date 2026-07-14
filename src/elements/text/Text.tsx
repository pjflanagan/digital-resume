import React from "react";
import classNames from "classnames";

import type { ContentLink } from "src/content/types";

import { ParseTextForLinks, LinkCallback } from "./ParseTextForLinks";

import * as Style from "./Text.module.scss";

type HeadingProps = {
  className?: string;
  children?: React.ReactNode;
};

// TextTitle h1
const TextTitle = ({ className, children }: HeadingProps) => (
  <h1 className={className}>{children}</h1>
);

// TextSection h2
const TextSection = ({ className, children }: HeadingProps) => (
  <h2 className={className}>{children}</h2>
);

// TextHeading h3
const TextHeading = ({ className, children }: HeadingProps) => (
  <h3 className={className}>{children}</h3>
);

// TextSubHeading h4
const TextSubHeading = ({ className, children }: HeadingProps) => (
  <h4 className={className}>{children}</h4>
);

// TextAccent h5
const TextAccent = ({ className, children }: HeadingProps) => (
  <h5 className={className}>{children}</h5>
);

// TextTag
const TextTag = ({ children }: { children?: React.ReactNode }) => (
  <span className={Style.textTag}>{children}</span>
);

type TextProps = {
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  children?: string;
  links?: ContentLink[];
  callback?: LinkCallback;
};

// Text
const Text = ({
  dangerouslySetInnerHTML,
  className,
  children,
  links,
  callback
}: TextProps) => {
  if (!!dangerouslySetInnerHTML)
    return (
      <p
        className={className}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  return (
    <p className={className}>
      {ParseTextForLinks(children || '', links, callback)}
    </p>
  );
};

type TextPageCenterProps = {
  className?: string;
  headline: React.ReactNode;
  blurb: React.ReactNode;
  style?: React.CSSProperties;
};

const TextPageCenter = ({
  className: classNameProp,
  headline,
  blurb,
  style
}: TextPageCenterProps) => (
  <div className={classNames(Style.textPageCenter, classNameProp)} style={style}>
    <div className={Style.textHeadline}>{headline}</div>
    <div className={Style.textBlurb}>{blurb}</div>
  </div>
);

export { ParseTextForLinks } from "./ParseTextForLinks";
export { TextType } from "./TextType";
export { TextInlineLink } from "./TextInlineLink";
export { TextLinkedHeader } from "./TextLinkedHeader";
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
