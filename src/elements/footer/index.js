import classNames from "classnames";
import React from "react";

import FooterText from "src/content/footer.json";
import { Text } from "src/elements";

import * as Style from "./style.module.scss";

const Footer = ({
  className: classNameProp
}) => {
  const className = classNames(Style.footer, {
    [classNameProp]: classNameProp
  })
  return (
    <div className={className}>
      {FooterText.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text links={linkText.links}>{linkText.text}</Text>
        </div>
      ))}
    </div>
  );
};

export { Footer };
