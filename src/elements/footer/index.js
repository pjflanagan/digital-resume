import React from "react";
import classNames from "classnames";

import { Text } from "src/elements";

import * as Style from "./style.module.scss";

const Footer = ({
  className: classNameProp,
  text
}) => {
  const className = classNames(Style.footer, {
    [classNameProp]: classNameProp
  })
  return (
    <div className={className}>
      {text.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text links={linkText.links}>{linkText.text}</Text>
        </div>
      ))}
    </div>
  );
};

export { Footer };
