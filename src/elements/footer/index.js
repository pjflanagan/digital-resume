import React from "react";

import FooterText from "src/content/footer.json";
import { Text } from "src/elements";

import Style from "./style.module.scss";

const Footer = () => {
  return (
    <div className={Style.footer}>
      {FooterText.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text links={linkText.links}>{linkText.text}</Text>
        </div>
      ))}
    </div>
  );
};

export { Footer };
